import React, {Component} from 'react';
import axios from 'axios';
import './Match.css';
import {Link} from 'react-router-dom'

export class Matched extends Component{
    constructor(){
        super()
        this.state={
            menuExtension: false
        }
    }
    render(){
        return(
            <div className="Matched">
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
                <div className="matchedHeader">
                    <div className="spaceHolder"></div>
                    <div className="matchedHeaderText">
                        <span>We Found Your Match!</span><br/>
                        Check Your Email for Details!
                    </div>
                </div>
                <div className="matchedBody">
                    <div className="matchedImage">
                        <img src="http://www.pngmart.com/files/1/Book-PNG-File.png"/>
                        <div>
                            One of millions of matches!<br/> Welcome to the club, come and trade again!
                        </div>
                    </div>
                    <div className="matchedText">
                        <div>You should be recieving an email after hitting the Match buttonwith a UPS sticker remember to ship as soon as you print your UPS sticker! </div>
                        <div>You can track your package live on the <a href="http://ups.com">UPS Tracker</a></div>
                        <button>CHECK YOUR EMAIL FOR SHIPPING DETAILS</button>
                    </div>
                </div>
            </div>
        )
    }
}

export class UnMatched extends Component{
        constructor(){
            super()
             this.state={
                 menuExtension: false
             }
        }
    render(){
        return(
            <div className="Matched">
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
            <div className="matchedHeader">
                <div className="spaceHolder"></div>
                <div className="unmatchedHeaderText">
                <span>We Didn't Find A Match!</span><br/>
                Don't Call Us We Will Call You!
                </div>
            </div>
            <div className="matchedBody">
                <div className="matchedImage">
                    <img src="http://www.pngmart.com/files/1/Book-PNG-File.png"/>
                    <div>
                        Sorry there is currently no one looking for your book or no one has the book your looking for
                    </div>
                </div>
                <div className="matchedText">
                    <div> We will contact you when we find your match! Make sure to check your email in the coming weeks.</div>
                    <div>There is a higher chance of finding a matching in the begininning of each semester</div>
                    <div>Please contact us if you have any questions</div>
                </div>
            </div>
        </div>
        )
    }
}
