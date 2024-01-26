let upd=document.querySelectorAll("#update")//update buttons list
let sav=document.querySelectorAll("#save")//save buttons list

let namecont=document.querySelectorAll("#namecont")//taskname contaniner list
let desccont=document.querySelectorAll("#desccont")//task description container list
let datecont=document.querySelectorAll("#datecont")//task date container list

let compstat=document.querySelectorAll(".compstat")//checkbox for completion status

let oldnames=[]//this is a array for storing all the taskname because we can use this array to pass the name for refernce to update any task

//running a loops and adding listeners to all update buttons
for(let c=0;c<upd.length;c++)
{
    oldnames.push(namecont[c].innerText)//pushing all the tasknames to the oldnames array

    upd[c].addEventListener("click",()=>{
    //here we are addig inputs when we click on update 
    namecont[c].innerHTML=`<input type=text id=newname value=${namecont[c].innerText}>`
    desccont[c].innerHTML=`<input type=text id=newdesc value=${desccont[c].innerText}>`
    datecont[c].innerHTML=`<input type=date id=newdate value=${datecont[c].innerText}>`
    
    //making the save button visible and update btn none
    upd[c].style.display="none"
    sav[c].style.display="inline"
})

}


//running a loop for adding listeners on save buttons
for(let d=0;d<upd.length;d++)
{
    

    sav[d].addEventListener("click",()=>{
        //the  input fields for typing new name,desc,date
        let newname=document.querySelector("#newname")
        let newdesc=document.querySelector("#newdesc")
        let newdate=document.querySelector("#newdate")
        console.log(newname)
        //on clicking save we will be replacing the input fields by its values
        namecont[d].innerText=newname.value
        desccont[d].innerText=newdesc.value
        datecont[d].innerText=newdate.value

        //sending a post req to save the updates
        $.ajax({
    url:"/update",
    type:"POST",
    data:{
     ref:oldnames[d],//sending the old taskname which is to be update along with new details
     newtaskname:namecont[d].innerText,
     newtaskdesc:desccont[d].innerText,
     newdate:datecont[d].innerText
    },
    success:function(data)
    {
        if(data.status=="success")
        {
            console.log("Added")
        }
        else{
            console.log("not added")
        }
    }
    
    })

    //making it to reload to display changes
    location.reload()    
    })
    
}

//running a loop for adding listeners on completion status checkboxs
for(i of compstat)
{
    //making the checkbox disable once it is marked as completed
    if(i.checked)
    {
        i.disabled=true
    }
 else{   
    //if it is not completed then adding listners to it
i.addEventListener("click",(v)=>{

    let ref=v.target.attributes.name.value//getting reference taskname which we set as attribute in the input tag

    console.log(v.target.checked)

    //sending the post req for saving the completion status in db along with the refernce name
    $.ajax({
    url:"/update",
    type:"POST",
    data:{
     taskstatus:true,

     ref:ref
    },
    success:function(data)
    {
        if(data.status=="success")
        {
            console.log("Added")
        }
        else{
            console.log("not added")
        }
    }
    
    })

    //making reload to display the changes
    location.reload()
})
}
}