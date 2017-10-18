import React, {Component} from 'react';
import axios from 'axios';
import './Account.css';
import { Link } from 'react-router-dom'

export default class Account extends Component{
        constructor(){
            super()
                this.state={
                    menuExtension: false,
                    email: '',
                    wanted: '',
                    tradein:'',
                    wantedmatch: false,
                    tradeinmatch: false
                }
        }
        componentDidMount(){
            axios.get('/api/account').then((booklist)=>{
                console.log('user info', booklist.data)
                this.setState({
                    wanted: booklist.data[0].wanted,
                    tradein: booklist.data[0].tradein,
                    wantedmatch: booklist.data[0].wantedmatch,
                    tradeinmatch: booklist.data[0].tradeinmatch
                })
                console.log(this.state)
            })
            axios.get('api/account/user').then((user)=>{
                this.setState({
                    email: user.data[0].email
                })
            })
        }
        getEmail(){
            return(
                <div className="accountState">{this.state.email}</div>
            )
        }
        getWanted(){
            return(
                <div className="accountState">{this.state.wanted}</div>
            )
        }
        getTradein(){
            return(
                <div className="accountState">{this.state.tradein}</div>
            )
        }
        getWantedMatch(){
            return(
                <div className="accountState">{this.state.wantedmatch}</div>
            )
        }
        getTradeinMatch(){
            return(
                <div className="accountState">{this.state.tradeinmatch}</div>
            )
        }
        deleteRequest(){
            axios.delete(`/api/delete/${this.state.email}`).then(axios.get('/api/account').then((booklist)=>{
                console.log('setting state after delete',)
                if(booklist.data){
                    this.setState({
                        wanted: "",
                        tradein: "",
                        wantedmatch: "",
                        tradeinmatch: ""
                    })
                }

                console.log('state',this.state)
            }))
        }
    render(){
        return(
            <div className="Account">
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
                <div className="accountBody">
                    <div className="accountBodyTitle">Customer Profile Details</div>
                    <div className="accountInformation">
                        <div className="infoField">Email: {this.getEmail()}</div>
                        <div className="infoField">Wanted: {this.getWanted()}</div>
                        <div className="infoField">Tradein: {this.getTradein()}</div>
                        <div className="infoField">Wanted Match: {this.getWantedMatch()}</div>
                        <div className="infoField">Tradein Match: {this.getTradeinMatch()}</div>
                    </div>
                    <button onClick={()=>{this.deleteRequest()}}>Delete Request</button>
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
        )
    }
}