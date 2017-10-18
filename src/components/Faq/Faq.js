import React, {Component} from 'react';
import './Faq.css';
import {HashLink as Slink} from 'react-router-hash-link';
import { Link } from 'react-router-dom'




export default class Faq extends Component{
    constructor(){
        super()
        this.state={
            menuExtension: false
        }
    }
    render(){
        return(
            <div className="Faq">
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
                <div className="faqBody">
                    <div className="faqHeader">
                        <div className="linkHeaderTitle">FAQ</div>
                        <div>Below are some of our frequently asked questions. If you still can not find an answer you are looking for please <Link to="/private/contact">contact us!</Link></div>
                    </div>
                    <div className="isbnBody">
                        <div className="linkHeaderTitle"><Slink to="/private/faq/#isbnLink">ISBN's</Slink></div>
                        <div className="isbnLinks">
                            <Slink to="/private/faq/#isbnLinkOne">What is an ISBN?</Slink>
                            <Slink to="/private/faq/#isbnLinkTwo">Where can i find the ISBN of my book?</Slink>
                            <Slink to="/private/faq/#isbnLinkThree">What does an ISBN look like?</Slink>
                            <Slink to="/private/faq/#isbnLinkFour">Do You Accept Books that Don't Have an ISBN</Slink>
                        </div>
                    </div>
                    <div className="typeOfBooksBody">
                        <div className="linkHeaderTitle"><Slink to="/private/faq/#typeOfBooksLink">Type of Books</Slink></div>
                        <div className="typeOfBooksLinks">
                            <Slink to="/private/faq/#typeLinkOne">What types of books do you trade?</Slink>
                            <Slink to="/private/faq/#typeLinkTwo">What types of books do you not trade?</Slink>
                            <Slink to="/private/faq/#typeLinkThree">Do you trade items marked Not For Resale?</Slink>
                            <Slink to="/private/faq/#typeLinkFour">Can you trade more than one copy of one book?</Slink>
                        </div>
                    </div>
                    <div className="bookConditionBody">
                        <div className="linkHeaderTitle"><Slink to="/private/faq/#conditionLink">Book Condition</Slink></div>
                        <div className="bookConditionLinks">
                        <Slink to="/private/faq/#conditionLinkOne">What sort of physical condition should the books be in?</Slink>
                        <Slink to="/private/faq/#conditionLinkTwo">Do you accept books that include CD's?</Slink>
                        </div>
                    </div>
                    <div className="shippingBody">
                        <div className="linkHeaderTitle"><Slink to="/private/faq/#shippingLink">Shipping</Slink></div>
                        <div className="shippingLinks">
                            <Slink to="/private/faq/#shippingLinkOne">What if I Want To Ship My Books Using UPS, Federal Express or the US Postal Service using First Class Mail?</Slink>
                            <Slink to="/private/faq/#shippingLinkTwo">Should I pay for traking and insurance on my package?</Slink>
                            <Slink to="/private/faq/#shippingLinkThree">What happens if my match doesn't recieve my book?</Slink>
                            <Slink to="/private/faq/#shippingLinkFour">How long do i have to mail my book</Slink>
                        </div>
                    </div>
                    <div className="isbnLinkBody">
                        <div id="isbnLink" className="linkBodyTitle">ISBN's</div>
                        <div id="isbnLinkOne">Q: What is an ISBN?</div>
                        <div>A: ISBN is an abbreviation for “International Standard Book Number”. It's the standardized identification system for books and other media.</div>
                        <div id="isbnLinkTwo">Q: Where can i find the ISBN of my book?</div>
                        <div>A: Publishers typically puts the ISBN on the back cover of the book, usually above or near the barcode. They are also shown on the copyright information page within the first few pages of the book. If the item is a single volume and part of a set, this would be a good place to look, as it shows the ISBN of each volume.</div>
                        <div id="isbnLinkThree">Q: What does an ISBN look like?</div>
                        <div>A: Usually the letters ISBN will be printed followed by a number with sections separated by hyphens, e.g. ISBN 0-89123-145-2</div>
                        <div id="isbnLinkFour">Q: Do you trade books without ISBNs?</div>
                        <div>A: We do not trade books without ISBNs, as it is generally difficult to determine the specifics of them</div>
                    </div>
                    <div className="typeOfBooksBody">
                        <div id="typeOfBooksLink" className="linkBodyTitle">Type of Books</div>
                        <div id="typeLinkOne">Q: What type of books do you trade?</div>
                        <div>A: We buy trades that meet our book condition guidelines, are available for resale and have at least a little market value. Our pricing page will tell you whether we are trading a specific book once you've entered the ISBN. Items that we typically do not buy are: Older books, books without ISBNs, encyclopedia sets, magazines, music books, comic books, books that are marked as “not for resale,” books that are in poor condition, outdated text books, etc.</div>
                        <div id="typeLinkTwo">Q:What types of books do you NOT accept?</div>
                        <div>A:We do not buy Instructor Edition Textbooks Examination copies Teacher's Edition Advanced Readers Copy (ARC) Items without an ISBN printed on the book Items that are sexually explicit and/or offensive Non book items such as Calendars and board games (even though they may have an ISBN) Encyclopedia Sets</div>
                        <div id="typeLinkThree">Q: Do you trade items marked Nof for Resale</div>
                        <div>A: No we do not trade any items marked not for resale, for example, but not limited to advanced readers copies, instructors editions, and examination copies. This information is often hidden by heavy use of tape and stickers, so be cautious. They will be rejected upon arrival.</div>
                        <div id="typeLinkFour">Q: Can you trade more than one copy of one book?</div>
                        <div>A: We do not buy more than a single copy of a book per household. If you place multiple orders or create multiple accounts to sell the same item we will not accept it and you will not be paid for any of your orders! We only accept one copy of the same item per household. We are very sorry but this is strictly enforced and no exceptions are made.</div>
                    </div>
                    <div className="bookConditionBody">
                        <div id="conditionLink" className="linkBodyTitle">Book Condition</div>
                        <div id="conditionLinkOne">Q: What sort of physical condition should the books be in?</div>
                        <div>A: All books sold to sellbackyourBook.com must be in good condition or better. What does good condition mean?<br/>
No Water Damage<br/>
No Tears on the cover or pages<br/>
Workbooks must not have any writing in them<br/>
Less than 30% of the book has highlighting/underlining or writing (remember workbooks must have NO writing)<br/>
No Missing or Loose Pages<br/>
No fire or smoke damage<br/>
Minimal wear to the binding - pages should be firmly attached to the binding -- bindings cannot be broken<br/>
No strong odor of any kind (including musty or cigarette odor, for example)<br/>
No items with the access code exposed. This includes standalone items (for example an item that is an access code for online class like Mathlab) as well as items which include a supplementary access code (for example a textbook packaged with an associated access code for an accompanying online class).<br/>


Items we receive that do not meet these requirements are not eligible for payment. The quote will be deducted from the total amount - so please make good judgment when assessing your items and please pack your books carefully. </div>
                        <div id="conditionLinkTwo">Q: What happens if you do not accept one or more of my books?</div>
                        <div>
                            <p>A:We will inform you immediately of any issues via email. Issues will put your payment on hold until they are resolved by your response. We will either recycle the item and deduct the quote from the total, or send the item(s) back for a return processing fee of $3.99. This fee can be deducted directly from your total quote, or sent via PayPal.</p>
                            <p>To ensure that books are not damaged please follow these guidelines: Use a sturdy box. Thin boxes (e.g., cereal boxes) may not protect your books in shipment. Do not use packing peanuts for packing material. Packing peanuts shift during transit, damage pages and often become crushed by the weight of the books during shipment! A large amount of shipments we've received using packing peanuts result in several damaged books. Choose the right size of box. Huge boxes of books nearly always result in damaged books Keep the weight of each box and books under 35lbs. Heavy boxes nearly always result in damaged books Use wadded up newspaper to fill gaps. Newspaper can be wadded up tightly and provide protection</p>
                        </div>
                    </div>
                    <div className="shippingBody">
                        <div id="shippingLink" className="linkBodyTitle">Shipping</div>
                        <div id="shippingLinkOne">Q: Who pays for Shipping?</div>
                        <div>A: Shipping is always 100% free when you use the shipping label provided after checkout!</div>
                        <div id="shippingLinkTwo">Q: What if i want to ship my items through a different carrier?</div>
                        <div>A: We will gladly accept your packages no matter how you decide to ship them to us. However if you decide not to use our free shipping label, you will be responsible for the shipping costs. Also all items must be given to a carrier within 7 days of placing an order.</div>
                        <div id="shippingLinkThree">Q: Should I pay for insurance on my package of books?</div>
                        <div>A: Insurance is included with our pre-paid shipping label up to $100 dollars.</div>
                        <div id="shippingLinkFour">Q: What happens if I dont't include the correct book on the packing slip?</div>
                        <div>A: We'll contact you via email to confirm that the books were not shipped. If you purchased insurance and your package is missing books we will work with you to recover the cost of the books from the postal service. Only the sender of items (in this case, you) can recover the cost from the postal service. We will help you by providing an accurate accounting of the value.</div>
                        <div id="shippingLinkFive">Q: What happens if they don't recieve books?</div>
                        <div>A: If we can verify that you shipped out the items and you used our Free label - we will file a claim on your behalf with the shipping carrier.</div>
                        <div id="shippingLinkSix">Q: How long do i have after I mail my books to ship them to you?</div>
                        <div className="finalFaqText">A: All items must be given to a carrier within 7 days of placing an order.</div>
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
                                                <div>schoolbookBroker@gmail.com</div>
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
            </div>
        )
    }
}