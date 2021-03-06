import React, { Component } from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import Nav from "../components/Nav";


const pageStyle = {
    textAlign: "left",
    backgroundImage: "url(https://c4.wallpaperflare.com/wallpaper/7/81/258/typography-quote-motivational-wallpaper-preview.jpg)",
    backgroundSize: "cover",
    height: "800px",
    margin: "0",
    backgroundRepeat: "no-repeat",
    position: "relative"
}

const titleStyle ={
    color: "gold",
    marginLeft: "25%",
    textDecoration: "underline"
}

const inputStyle = {
    marginTop: "3%",
    color: "white",
    marginLeft: "25%"
}

const descripStyle = {
    marginTop: "3%",
    color: "white",
    marginLeft: "25%",
    width: "40%"
}

const secStyle = {
    marginTop: "3%",
    color: "gold",
    marginLeft: "25%",
    textDecoration: "underline"
}

class JoinGoal extends Component{
    constructor() {
        super();
        this.state = { 
            title: "",
            category: "",
            description: "",
            createdBy: "",
            username: "",
            userId: "",
            userGoals: [],
            redirectTo: null,
            
        };
    }
    //joinGoal(){
//this.setState

  //  }

    // componentWillMount(){
    //     this.getLoginStatus()
    //   }
    
    //   getLoginStatus(){
    //     axios.get("/auth/user_data")
    //     .then(data => {
    //       if(data.username){
    //         return this.setState({isLoggedIn: true})
    //       }
    //     }).catch(err => {
    //       console.log(err);
    //     })
    //   }

    componentDidMount(){
        this.fetchUser()
        this.fetchGoal(this.props.match.params.id);    
    }

    fetchGoal = async goalId => {
        let {data} = await axios.get("/api/goals/" + goalId);
        this.setState({
            title: data.title,
            category: data.category,
            description: data.description,
            // createdBy: ""
        })
    }

    fetchUser = async () => {
        let {data} = await axios.get("/auth/user_data")
        console.log(data);
        
        this.setState({
            username: data.username || "",
            userId: data.id || "",
            userGoals: data.goals || []
        })
       // this.fetchGoal(data);
    }

    userHasGoal = () => {
        return (this.state.userGoals.includes(this.state.goalId))
    }

    handleSubmit = (event) => {
        event.preventDefault();

        axios.post("/auth/joingoal", {
            userGoals:this.state.goals
        })
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        

        return (
            <form style={pageStyle}>
                <Nav />
                <div className="form-group titleDiv">
                 <h1 className="heading" style={titleStyle}>Goal </h1>
                    <h2 style={inputStyle}>{this.state.title}</h2>
                </div>
                <div className="catDiv">
                    <h3 style={secStyle}>Category</h3>
                    <h4 style={inputStyle}>{this.state.category}</h4>
                </div>
                <div className="descripDiv">
                    <h3 style={secStyle}>Description</h3>
                    <p style={descripStyle}>{this.state.description}</p>
                </div>
                { this.userHasGoal() ?
                <button className="abandon" type="submit" style={{marginLeft: "25%"}}>Abdandon Goal!</button>: 
                <button className="join" type="submit" onClick={this.handleSubmit} style={{marginLeft: "25%"}}>Join Goal!</button>
                }
            </form>
        )
    }
}

export default JoinGoal;