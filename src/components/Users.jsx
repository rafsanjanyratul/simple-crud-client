import React, { use, useState } from 'react';

const Users = ({usersPromise}) => {
    const initialUser = use(usersPromise)
    const [users, setUsers]= useState(initialUser)

    const [editingUser, setEditingUser] = useState(null)
    
    const handleAddUser = e => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const newUser = {name,email}
        console.log(newUser)
        fetch("http://localhost:3000/users",{
            method:'Post',
            body:JSON.stringify(newUser),
            headers: {
    "Content-type": "application/json"
  }
        }).then(res=>res.json()).then(data=>{
            console.log(data)
            if(data.insertedId){
                newUser._id=data.insertedId
                const newUsers = [...users, newUser]
                setUsers(newUsers)
                alert("users added successfully")
                e.target.reset()
            }
        })
    }
    const handleDelete = (id)=>{
console.log("delete clicked",id)
fetch(`http://localhost:3000/users/${id}`,{
    method:"delete"
}).then(res=>res.json()).then(data=>{console.log(data)
    if (data.deletedCount > 0) {
                setUsers(prevUsers =>
                    prevUsers.filter(user => user._id !== id))
                    alert("user deleted successfully")
            }
})
    }

    const handleEdit = (user) => {
    setEditingUser(user)
}
    const handleUpdateUser = (e) => {
    e.preventDefault()

    const name = e.target.name.value
    const email = e.target.email.value

    const updatedUser = { name, email }

    fetch(`http://localhost:3000/users/${editingUser._id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if (data.modifiedCount > 0) {
                const updatedUsers = users.map(user =>
                    user._id === editingUser._id
                        ? { ...user, ...updatedUser }
                        : user
                )

                setUsers(updatedUsers)
                setEditingUser(null)
                e.target.reset()

                alert("User updated successfully")
            }
        })
}
    return (
        <div>
            <h3>users:{users.length}</h3>
            <form onSubmit={editingUser ? handleUpdateUser : handleAddUser}>
    <input
        type="text"
        name="name"
        defaultValue={editingUser?.name || ""}
    />

    <input
        type="email"
        name="email"
        defaultValue={editingUser?.email || ""}
    />

    <button>
        {editingUser ? "Update" : "Add"}
    </button>
</form>
<div>
    
    {
     users.map(user =>
    <p key={user._id}>
        {user.name}: {user.email}

        <button onClick={() => handleEdit(user)}>
            Edit
        </button>

        <button onClick={() => handleDelete(user._id)}>
            x
        </button>
    </p>
)
    }
    
</div>

        </div>
    );
};

export default Users;