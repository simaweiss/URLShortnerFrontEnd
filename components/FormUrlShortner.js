import React, { Component } from 'react';

class FormUrlShortner extends Component{
    constructor(props) {
        super(props)

        this.state = {

            fullUrlInput: '',
            shortUrlInput:'',
            fullUrl: '' ,
            shortUrl: '',
            emptyMessage: 'Input cannot be empty'

        }
        this.baseState = this.state   

    }


   onChange = e => this.setState({ [e.target.name]: e.target.value })

    
    handleclearFiled = () => {this.setState(this.baseState)}
 
    handleSaveClick(e) {
        e.preventDefault();

        if(this.state.fullUrlInput === ""){
            this.setState({shortUrl: this.state.emptyMessage})
            return; 
        }

      

        const requestOptions = {
            method: 'POST',
            headers:  {'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify({fullUrl: this.state.fullUrlInput})
        };
        fetch('http://localhost:8080/api/urlshortner/', requestOptions)
        .then(response => response.json())
         .then((result) =>{
             this.setState({
                shortUrl: result.shortUrl})
         })     
        }

        handleShowFullUrlClick(e) {
            e.preventDefault();
           const value= this.state.shortUrlInput.trim()
            if(!value){
                this.setState({fullUrl: this.state.emptyMessage})
                return; 
            }

            const requestOptions = {
                method: 'GET',
                headers:  {'Accept': 'application/json'},
            };
            
           fetch('http://localhost:8080/api/urlshortner/?requstparam=' + this.state.shortUrlInput, requestOptions)
            .then(response => response.json())
            .then((result) =>{
                this.setState({
                   fullUrl: result.fullUrl})
            })
           
            }

    render() {
        const {fullUrlInput, shortUrl, shortUrlInput, fullUrl} = this.state;
        
       
            return (
               <form className="app-form">  
                   <h2>
      <span className = "font-weight-bold">MyURLShortner</span>.com
      </h2>
     
      <label>Full URL:</label>
                <div class="form-row">
                <div class="form-group col-md-9">
                          <input className="form-control" 
                          type= "text"
                          name = "fullUrlInput"
                          placeholder = "Full URL"
                            value={fullUrlInput}      
                            onChange={this.onChange}
                            />
                </div>
                <div class="form-group col-md-3">
                <button type="button" class="btn btn-primary"
                                onClick={(e) => this.handleSaveClick(e)} > 
                                Save
                                </button>
                 </div>
                 </div>
                 <div class= "mb-2" >
                 <textarea className= "form-control" type= "text" value ={shortUrl}/>  
                 </div>
                  <div class="mb-2">
                  <lable>Short URL:</lable>
                  </div>
                     <div class="mb-3">
                     <input  className="form-control"
                         type= "text"
                          name = "shortUrlInput"
                          placeholder = "Short URL"
                            value={shortUrlInput}
                            onChange={this.onChange}
                            />
                     </div>
                        <div class="mb-3">

                        <button type="button" class="btn btn-info"
                                onClick={(e) => this.handleShowFullUrlClick(e)} >      
                               Show Full URL
                                </button>
                        </div>
                    <div class="mb-3">
                    <textarea className= "form-control" type= "text" value ={fullUrl}  />  
                    </div>
                        
              
                 <button type="button" class="btn btn-dark"
                        onClick= {this.handleclearFiled}
                        >
                        Clear
                        </button>      
                          
                  </form>        
                  
                                  
                                
                );
           
    }
}
export default FormUrlShortner;