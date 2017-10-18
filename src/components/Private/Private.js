import React, {Component} from 'react';
import axios from 'axios';
import './Private.css';
import 'react-fontawesome';
import Match from '../Match/Match.js';
import session from 'express-session';
import cors from 'cors';
import { Link } from 'react-router-dom'


export default class Private extends Component{
    constructor(){
        super()
        this.state={
                redLink: true,
                blueLink: false,
                greyLink: false,
                greenLink: false,
                wantedIsbnInput: '',
                tradeInIsbnInput:'',
                count: '',
                wantedTitle: '',
                tradeinTitle: '',
                checker: false,
                menuExtension: false

        }
    }
    buttonSelector(x){
       this.state.redLink =false;
       this.state.blueLink=false;
       this.state.greyLink=false;
       this.state.greenLink=false;
       this.setState({
           [x]: true
       })
    }
    clickHandler(){
        axios.post('/api/match', {
            wanted: this.state.wantedIsbnInput,
            tradein: this.state.tradeInIsbnInput
        }).then(()=>{this.handleFilter()})
    }
    handleFilter(){
        axios.get('/api/booklist').then((arr)=>{
            arr= arr.data;
            var wantedArr=[];
            var tradeInArr=[];
            for(var i = 0; i < arr.length; i++){
                if(wantedArr.indexOf(arr[i].wanted)==-1){
                    wantedArr.push(arr[i].wanted);
                }
                if(tradeInArr.indexOf(arr[i].tradein) == -1){
                tradeInArr.push(arr[i].tradein);
                }
            }
            for(var j = 0; j < wantedArr.length; j++){
              for(var t= 0; t < tradeInArr.length; t++){
                if(wantedArr[j] == tradeInArr[t] && arr[j].wantedmatch == null && arr[t].count <= 2){
                  arr[j].wantedmatch=arr[t].id;
                  arr[j].count++
                }
                if(tradeInArr[j] == wantedArr[t] && arr[j].tradeinmatch == null && arr[t].count <= 2){
                  arr[j].tradeinmatch=arr[t].id;
                  arr[j].count++
                }
              }
            }
            console.log('updated arr', arr)
            arr.map((x)=>{
                if(x.count == 2){
                     axios.put('/api/update/booklist', x).then(()=>{this.linkSelector()})
                }
                else{
                    this.linkSelector()
                }
            })
            
        })
    }
    getBookTitle(){
        axios.get(`/api/booktitle/${this.state.wantedIsbnInput}`).then((res)=>{
            this.setState({
                wantedTitle: res.data
            })
        });
        axios.get(`/api/booktitle/${this.state.tradeInIsbnInput}`).then((res)=>{
            this.setState({
                tradeinTitle: res.data,
                checker: true
            })
        });
    }
    linkSelector(){
        axios.get('/api/countchecker').then(res=>{
            console.log('this should be two', res)
            if(res.data == 2){
                this.setState({
                    count: res.data
                })
            }
            console.log('count after setState',this.state.count)
            this.props.history.push(this.state.count ? '/private/matched' : '/private/unmatched')
        })
    }
        render(){
            console.log(this.state)
            return(
                
                <div className="privateComponent">
                    <div className={this.state.checker ? "privateHeaderOff" : "privateHeader"}>
                        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
                        <div className="header">
                            <div className="menuBarBackground">
                                <div className="menuBar">
                                    <div className="appText">
                                    Trade books faster with our Free Android App or Free IPhone App with barcode scanner!
                                    </div>
                                    <div className="cart-logo">
                                    </div>
                                    <div className="menuText" onClick={()=>{this.setState({menuExtension: !this.state.menuExtension})}}>Menu</div>
                                    <img src ="http://blog.nassp.org/wp-content/themes/schoolofthought2015/images/nassp_hamburger.png" alt="menu logo"/>
                                </div>
                                <div className={this.state.menuExtension ? "menuExtensionBackground" : "menuExtensionBackgroundOff"}>
                                    <div className="menuContent">
                                    <Link to="/private">Home</Link><div className="verticleLine"></div><Link to="/private/account">Account</Link><div className="verticleLine"></div><Link to="/private/faq">FAQ</Link><div className="verticleLine"></div><Link to="/private/contact">Contact</Link><div className="verticleLine1"></div>
                                    </div>
                                </div>
                            </div>
                            <div className ="logoBar">
                                <div className= "logo">schoolbook<span>Broker</span>.com</div>
                            </div>
                        </div>
                        <div>
                        <div className="mainBanner"></div>
                        <div className="inputHolder">
                            <div>Trade Books Now!</div>             
                            <input className="isbnInput" type="text" placeholder="Enter Your wanted ISBN Here" onChange={(e)=>{
                                this.setState({
                                    wantedIsbnInput: e.target.value
                                })
                            }}/>
                            <input className="isbnInput" type="text" placeholder="Enter Your TradIn ISBN Here" onChange={(e)=>{
                                this.setState({
                                    tradeInIsbnInput: e.target.value
                                })
                            }}/>
                          <button  className="getMatched" onClick={()=>{
                               this.getBookTitle()}}>Get Matched!</button>
                            <div>Millions of Books Traded!</div>
                        </div>
                        </div>
                        <div className="privateButtonContainer">
                            <button className='redBox' onClick={()=>{this.buttonSelector('redLink')}}>Why Trade Books at<br/>School Book Broker?</button>
                            <button className="blueBox" onClick={()=>{this.buttonSelector('blueLink')}}>How do I find my books ISBN</button>
                            <button className="greyBox" onClick={()=>{this.buttonSelector('greyLink')}}>Find Out More</button>
                            <button className="greenBox" onClick={()=>{this.buttonSelector('greenLink')}}>Sell Books Online</button>
                        </div>
                        <div className={this.state.redLink ? "redLink" : "redLinkOff"}>
                            <div className="redText">
                                <div className="bestPrices">
                                    <div>Best Prices</div>
                                    <div>We update our prices continuously to offer the best price online!</div>
                                </div>
                                <div className="freeShipping">
                                    <div>Free Shipping</div>
                                    <div>We always offer Free Shipping. Print a label and you're done!</div>
                                </div>
                                <div className="fastShipping">
                                    <div>Fast Shipping</div>
                                    <div>We ship fast! All packages are processed within three buisness days of your match</div></div>
                                <div className="betterBuisness">
                                    <div className="bbbLogo"></div>  
                                    <p className="bbbText"><span>School Book Broker is not a scam!</span><br/> We are an accredited buisness with the BBB and have an A rating.<br/> We are proud of our rating and work hard to resolve any issues that may come up.</p> 
                                </div>
                            </div>
                            <img className = "customerPhoto" src="https://www.tsl.texas.gov/ld/librarydevelopments/wp-content/uploads/2014/01/Customerservice.jpg" alt="customers in library"/>
                        </div>
                        <div className={this.state.blueLink ? "blueLink" : "blueLinkOff"} >
                            <div className="blueText">
                                <p className="blueP1">Your books ISBN number can usually be found on tha back of the book above the barcode</p>
                                <p>An ISBN can be a 10 or 13 digit number and School Book Broker matching tool accepts both. If your book does not have a barcode or sticer is covering the barcode you can usually find the ISBN inside of the front title page were you would find publisher information. Books published before 1970 do not have ISBN numbers and we cna not trade them.</p>
                            </div>
                            <div><img className="isbnImage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/ISBN_with_EAN13.svg/2000px-ISBN_with_EAN13.svg.png" alt="isbn logo"/></div>
                        </div>
                        <div className={this.state.greyLink ? "greyLink" : "greyLinkOff"}>
                            <p>To find out more about trading books online check out our FAQ section. We also love to talk to our customers so if you have any specific questions feel free to contact us, don't like to email? No worries, you can call or even comment on our facebook page!(as long as its ageneral question, remember anything you post can be seen by others)</p>
                        </div>
                        <div className={this.state.greenLink ? "greenLink" : "greenLinkOff"}>
                            <p>Selling Books online to Sell Back Your Book could not be easier. Simply enter your books ISBN number in the box above and we will give you an instant price quote! Sell books with free shipping and no worries about if your book will sell or not. Our online book buyback tool is the best way to get value for your used books.</p>
                        </div>
                        <div className="Footer">
                            <div className="reviewBox">
                                <img className="reviewPicture" src="http://schoolofux.com/images/logo-trustpilot@2x.png" alt="trust pilot review"/>
                                <div className="customerReviews">
                                    <div className="review1">
                                        <img src="http://www.crystalcentral.com/images/trustpilot/5_stars.png" alt="5 star review"/>
                                        <div>
                                            <p>I just traded back a bunch of books ...</p>
                                            <p>I just traded back a bunch of books with a bunch of different students from my college. Shipping was super fast!</p>
                                            <p>Ned B.</p>
                                        </div>
                                    </div>
                                    <div className="review1">
                                        <img src="http://www.crystalcentral.com/images/trustpilot/5_stars.png" alt="5 star review"/>
                                        <div>
                                            <p>I just traded back a bunch of books ...</p>
                                            <p>I just traded back a bunch of books with a bunch of different students from my college. Shipping was super fast!</p>
                                            <p>Cortney D.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottomFoot">
                                <div className="mobileLinkBackground">
                                    <div className="mobileLink">
                                        <div className="mobileText">schoolbookBroker.com<br/>Mobile Apps</div>
                                        <div className="mobileApps">
                                            <img className="androidApp" src="https://mlsvc01-prod.s3.amazonaws.com/7e69fcc9001/3769a535-7b20-4f0a-ba3d-471f24c61c9d.png" alt="android app"/>
                                            <img src="https://vignette.wikia.nocookie.net/postknight/images/b/b1/Apple_app_store_icon.png/revision/latest?cb=20170703032754" alt="iphone app"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="contactInfo">
                                    <div className="socialIcons">
                                        <div className="iconRow1">
                                            <img className="mcafee"src="http://res.cloudinary.com/dwhoj4km6/image/upload/c_scale,h_200,w_720/v1461580864/mcafee_ilfgdt.png" alt="mcafee logo"/>
                                            <img className="bbbIcon"src="https://www.bbb.org/globalassets/local-bbbs/pittsburgh-pa-84/pittsburgh_pa_84/ab-benefits/ab-seal-horizontal-us.png" alt="bbb logo"/>
                                        </div>
                                        <div className="iconRow2">
                                            <img className="payIcon" src="https://www.alternet.org/sites/default/files/styles/story_image/public/images/managed/storyimages_1324067997_paypal.gif?itok=lP4ELDKU" alt="paypal logo"/>
                                            <img src="https://kuaua.files.wordpress.com/2016/02/like-us-on-facebook-logo-png-i0.png" alt="facebook logo"/>
                                        </div>
                                    </div>
                                    <div className="contactUs">
                                        <div className="supportInfo">
                                            <div className="supportContact">Contact Us</div>
                                            <div className="email">
                                                <div className="support">Support</div>
                                                <div>schoolbookbroker@gmail.com</div>
                                                <div>123 trade street Ridgefield Nj, 07657</div>
                                            </div>
                                        </div>
                                        <div className="contactHeader">
                                            <div>schoolbook<span>Broker</span>.com</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="finalContact">
                                    <div>
                                    Sell Books | About Us | Terms of Use | Become an Affiliate | Book Buyback App | Register | Privacy | SBYB For Libraries | Sell Calculators | Sell DVDS | Buy Textbooks
                                    </div>
                                </div>
                                <div className="finalFooter">
                                    <div>schoolbookBroker @2017</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.checker ? "bookDescription" : "bookDescriptionOff"}>
                        <div className="bookDescriptionContainer">
                            <div className="descriptionHeader">Is This The Books You Entered?</div>
                            <div className="descriptionBody">
                                <div className="wantedBookDescription">
                                    <div>Wanted Book</div>
                                    <div className="wantedBookDescriptionHolder">
                                        <img src={`http://covers.openlibrary.org/b/isbn/${this.state.wantedIsbnInput}-M.jpg`}/>
                                        <div>Title: {this.state.wantedTitle}</div>
                                    </div>
                                </div>
                                <div className="tradeInBookDescription">
                                    <div>Trade In Book</div>
                                    <div className="tradeinBookDescriptionHolder">
                                        <img src={`http://covers.openlibrary.org/b/isbn/${this.state.tradeInIsbnInput}-M.jpg`}/>
                                        <div>Title: {this.state.tradeinTitle}</div>
                                    </div>
                                </div>
                                <button className="bookDescriptionFooter" onClick={()=>{this.clickHandler()}}>Yes these are my books</button>
                                <div className="returnLink">If these are not your books <a>click here</a></div>
                            </div>
                        </div>
                    </div>            
                </div>  
            )
        }
    }