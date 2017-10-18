import React, {Component} from 'react';
import axios from 'axios'
import './Admin.css'
export default class Admin extends Component{
    constructor(){
        super()
        this.state={
            clientList: []
        }
    }
    componentDidMount(){

        console.log('its running')
            axios.get('/api/joinlist').then((arr)=>{
                this.setState({
                    clientList:arr.data
                })
                console.log(this.state.clientList)
            })
            
        
    }
    
    render(){
        var clients= this.state.clientList.map((x, i)=>{
            if(x.count != 2){
                return(<div className='adminUnmatched'>
                {console.log(x.wantedmatch)}
                <div className="adminUserName">{x.email}</div>
                <div className="adminWanted">{x.wanted}</div>
                <div className="adminTradeIn">{x.tradein}</div>
                <div className="adminWantedMatch">{x.wantedmatch}</div>
                <div className="adminTradeInMatch">{x.tradeinmatch}</div>
            </div>)
            }
            else{
                return(<div className='adminMatched'>
                <div className="adminUserName">{x["user_name"]}</div>
                <div className="adminWanted">{x.wanted}</div>
                <div className="adminTradeIn">{x.tradein}</div>
                <div className="adminWantedMatch">{x.wantedmatch}</div>
                <div className="adminTradeInMatch">{x.tradeinmatch}</div>
            </div>)
            }
            })
        
        return(
            <div className="AdminContainer">
                    <div className="adminHeader">
                        <div className="adminHeaderLogo">schoolbook<span>Booker</span>.com</div>
                        <div className="adminHeaderAdmin">Admin: Woo</div>
                    </div>
                <div className="dataTable">
                    <div className="userInfoTitles">
                        <div>User Name</div>
                        <div>Wanted Book</div>
                        <div>Tradein Book</div>
                        <div>Wanted Match</div>
                        <div>Tradin Match</div>
                    </div>
                <div className="userInfoContainer">
                    {clients}
                </div>
                </div>
            </div>
        )
    }
}