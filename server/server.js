require('dotenv').config()
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      cors = require('cors')
      nodemailer = require('nodemailer'),
      axios = require('axios')

const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(bodyParser.json()) 
app.use(cors())
passport.use( new Auth0Strategy({
    domain: process.env.AUTH_DOMAIN,
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK
},


function(accessToken, refreshToken, extraParams, profile, done){
    const db = app.get('db');
    console.log('initial looking for user')
    db.get_user([profile.identities[0].user_id]).then(user=>{
        if(user[0]){
          
            console.log("found user")
            done(null, user[0].id)
        }
        else{
            console.log("create user")
           
            db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.identities[0].user_id ]).then(
               user=>{ done(null, user[0].id)
               }
            )
        }
    })
}))
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'schoolbookbroker@gmail.com',
        pass: process.env.EMAIL_PASSWORD
    }
});

passport.serializeUser(function(userID, done){
    done(null, userID)
})

passport.deserializeUser(function(userID, done){
    app.get('db').current_user([userID]).then(user=>{
        done(null, user[0])
    })
    
})

app.use(passport.initialize())
app.use(passport.session())

massive(process.env.CONNECTION_STRING).then(db=>{
    app.set('db', db)
}).catch(err=>{
    console.log(err)
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/private',
    failureRedirect: '/auth'
}))

app.post('/api/match', (req, res)=>{
    let {tradein, wanted} = req.body
    req.app.get('db').create_books([req.user.email, wanted, tradein]).then()
    console.log('api match', req.user.email)
    res.status(200).send('ok matched')
        })
app.delete('/api/delete/:request', (req, res)=>{
    console.log('username',req.params)
    req.app.get('db').delete_request([req.params.request]).then(
        res.status(200).send("deleted")
    )
})
app.get('/api/booklist', (req, res)=>{
    req.app.get('db').book_list().then(list=>{
        res.status(200).send(list)
    })
})
app.get('/api/joinlist', (req, res)=>{
    req.app.get('db').join_list().then(list=>{
        res.status(200).send(list)
    })
})
app.get('/api/booktitle/:isbn', (req, res)=>{
    axios.get(`http://isbndb.com/api/v2/json/Y0CIM6OS/book/${req.params.isbn}`).then(bookTitle=>{
    res.json(bookTitle.data.data[0].title)
    }).catch(err=>{
        console.log('bookTitle api hit', err)
        res.end()
    }
        
    )
})
app.get('/api/account', (req, res)=>{
    // console.log(req.user.email)
    req.app.get('db').user_book_list([req.user.email]).then((info)=>{
        res.status(200).send(info)
    })
})
app.get('/api/account/user', (req, res)=>{
    req.app.get('db').user_info([req.user.email]).then((info)=>{
        res.status(200).send(info)
    })
})
app.put('/api/update/booklist', (req, res)=>{
    console.log(req.body)
    let {user_name, wantedmatch, tradeinmatch, count}= req.body;
    req.app.get('db').update_list([wantedmatch, tradeinmatch, count, user_name]).then(()=>{

        var mailOptions = {
            from: 'schoolbookbroker.com',
            to: req.body.user_name,
            subject: 'We Found Your Match',
            html:`<div className="emailTemplate" style="width: 100%;
            margin:auto;
            ">
<div className="logoHeader" style="width:70%;
             border: 1px solid #DDDDDD;
             border-bottom:none;
             margin: auto;
             margin-top: 20px;
             " >
<div style="display: inline-block;
position:relative;
width:45%;
margin-left:4%;
color:#00b5e5;
font-size: 20px;
font-weight: bold;
padding-top:10px;
padding-bottom:10px
">schoolbook<span style="color: #39b54a">Broker</span>.com</div>
<div style="display: inline-block;
width:45%;
text-align: right;
font-size: 20px;
font-weight: bold;
padding-top: 10px;
padding-bottom: 10px
">Match Summary</div>
</div>
<div className="textHeader" style="width: 70%;
             border: 1px solid #DDDDDD;
             border-top:none;
             margin: auto" >
<div className="greeting" style="width:91%;
               border-top:1px solid #DDDDDD;
               margin: auto;">
<div style="font-weight: bold;
font-size: 18px;
margin:15px 0px 0px 10px">Hello Woo Lee,</div>
<div style="margin-left: 10px;
font-size: 15px">We've found your match! Once you and your match print your UPS label.</div>
</div>
<div className="buttonContainer" style="
                      width:91%;
                      margin:auto;
                      margin-top:15px;
                      margin-bottom:15px;
                      ">
<button style="height: 40px;
     width:40%;
     margin-right:10%;
     margin-left:4%;
     font-weight: bold;
     background: linear-gradient(to bottom, #f7dda0 0%, #f0c24e 100%);
     border-style: none">Print shipping label & instructions</button>
<button style="height: 40px;
     width: 40%;
     font-weight:bold;
     background: linear-gradient(to bottom, #f5f6f9 0%, #DDDDDD 100%);
     border-style: none">Check shipping & tracking status</button>
</div>
</div>
<div className="itemHolder" style="border:1px solid #DDDDDD;
             border-top:none;
             width:70%;
             margin: auto;">
<div className="itemHeader" style="width:100%;
                 margin:auto;
                 margin-bottom:15px;">
<div style="width:85%;
background-color:#DDDDDD;
display:inline-block;
margin-left:7%;
margin-top:20px">
<div style="display: inline-block;
  width:45%;
  margin: 15px 0px 15px 4%">
Send by<br/>
<span style="font-weight: bold">Sat, Dec,16</span>
</div>
<div style="display: inline-block;
  width:45%;
  text-align: right;">
Match ship method:<br/>
<span style="font-weight: bold">UPS shipping U.S<span/>
</div>
</div>

</div>
<div className="itemDescription" style="width:90%;
                      border:1px solid #DDDDDD;
                      margin: auto;
                      margin-bottom:10px;
                      position: relative";
                      display: inline-block >
<div style="display: inline-block;
width: 25%;
margin: 15px 0px 15px 15px;
">
<img src="https://cdn.tutsplus.com/net/uploads/legacy/969_cssMastery/phpab.jpg" style="width:100%;

                                                                          
                                        " />
</div>
<div style="display: inline-block;
width:50%;
color:#6191f9;">
Title: PHP for Absolute Beginners<br/>
Published in: 2017<br/>
Author: who? Onkar!
</div>
</div>
<div className="itemFooter" style="text-align: right;
                 width:95%;
                 border-top:1px solid #999999;
                 margin:auto;
                 margin-bottom: 20px;
                 margin-top: 20px;" >
<div style="
font-size:18px">
Estimated shipping cost: <span style="font-weight: bold" >$10.79*<span/>
</div>
<div style="display:inline-block;
font-size:15px">
Books will arrive around 4-7 days after shipping
</div>
</div>
</div>
<div className="emailFooter" style="width: 70%;
              margin: auto;
              color:#C1C1C1;
              text-align:center;
              padding-bottom:20px;
              border: 1px solid #DDDDDD;
              text-align:left;">
<p style="margin-left: 5px">The total shipping cost may vary based on shipping origin, late shipping, or other fees, <span >learn more.<span/></p>
<div style="margin-left: 5px">This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message</div>
</div>
</div>`

           
        }
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log('email error')
            }
            else{
                console.log('email sent' + info.response);
            }
        });
        res.status(200).send('noice')
    }
    )
})
app.get('/auth/logout', (req, res)=>{
    req.logOut();
    res.redirect(302, 'http://localhost:3000/#/')
})
app.get('/api/countchecker', (req, res)=>{
    req.app.get('db').get_count([req.user.email]).then(count=>{
        // console.log(count[0].count)
        res.status(200).send(count[0].count)
    })
})

app.get('/auth/user', (req, res)=>{
    res.status(200).send(req.user)
})
const port = 3333;
app.listen(port, ()=>{
    console.log("Listening on port " + port)
})
