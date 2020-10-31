import React, {Component} from 'react';
import ApiService from "../../Apiservice";

class UserListComponent extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            state: '',
            message: null,
        }
    }

    componentDidMount(){
        this.reloadUserList();
    }

    reloadUserList = () => {
        ApiService.fetchUsers().then(res => {
            this.setState({
                users: res.data
            })
        })
        .catch(err => {
            console.log('reloadUserList() Error!', err);
        })
    }

    render(){

        return(
            <div>
                <h2>User List</h2>
                <button onClick={this.addUser}> Add User </button>
                

                <table id = "emp">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>UserName</th>
                            <th>Ages</th>
                            <th>Salary</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map( user => 
                            <tr key = {user.state}>
                                <td>{user.state}</td>
                                
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserListComponent;