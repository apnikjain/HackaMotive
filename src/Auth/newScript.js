

var firebaseConfig = {
    apiKey: "AIzaSyCkiyk0Zq4I37NAz9ZDq0dS3D5YYAlQgco",
    authDomain: "hack-6eddc.firebaseapp.com",
    databaseURL: "https://hack-6eddc.firebaseio.com",
    projectId: "hack-6eddc",
    storageBucket: "hack-6eddc.appspot.com",
    messagingSenderId: "657963373637",
    appId: "1:657963373637:web:9fa5a75a748f2f5e153f2c"
  };

firebase.initializeApp(firebaseConfig);
var flag = false
var admin = false
const auth = firebase.auth();


if(localStorage.getItem("second") === "true"){
  var second = true
}
else{
  var second = false
}

if(localStorage.getItem("adminLoggedOut") === "true"){
  var adminLoggedOut = true
}
else{
  var adminLoggedOut = false
}
console.log(adminLoggedOut);

firebase.auth().onAuthStateChanged(async function(user) {
  document.getElementById("mainLoader").style.display = "flex";
  if (user) {

    var user = firebase.auth().currentUser;

    var sEmails =user.email.split("@") 
    var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
    Email = Email.concat(use,"@",domain)


    if(user.emailVerified){

    var flag = true
    console.log("2");
    var body = document.getElementById('body');
    // User is signed in.

    
    var admin =await checkAdmin(Email)
    var str = window.location.toString()
    if(str.substring(str.length,str.length-5) == "Admin"){
      console.log("admin",admin);
      if(admin === false){
        window.location.href = './auth.html'
      }
    }

    

    document.getElementById("user_div").style.display = "block";
    document.getElementById("container-login").style.display = "none";





    if(admin){
      if(adminLoggedOut === false){
        window.location.replace("./admin.html")}
      else{

        logout()


        
      }

      
      // document.getElementById("godMode").style.display = "block";
    }
    checkHandler()

    submissionHandler()

    var username =await loadUsername(Email)

    document.getElementById("displayUser").innerHTML = username
    if(user != null){

      var email_id = user.email;

     // document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }
  }
  else{
    
    document.getElementById("user_div").style.display = "none";
    document.getElementById("container-login").style.display = "block";
    document.getElementById("emailVarification").style.display = "block"
    logoutForVerification()
  }

  } else {
    
    var flag = true
    var body = document.getElementById('body');
    body.style.background = "url('../../eb.png')";
    var admin = false
    document.getElementById("user_div").style.display = "none";
    document.getElementById("container-login").style.display = "block";


  }
  document.getElementById("mainLoader").style.display = "none";
});



firebase.auth.Auth.Persistence.LOCAL

const SignIn = async() =>{
  console.log("1");
    var user = null
    var email = document.getElementById("Email")
    var password = document.getElementById("Password")
    await auth.signInWithEmailAndPassword(email.value, password.value).then(function() {
      document.getElementById("user_div").style.display = "block";
    document.getElementById("container-login").style.display = "none";
       // window.location.replace('./auth.html')
      }).catch(function(error) {
        alert(error.message)
      });

}


function logout(){
  var admin = false
  localStorage.setItem("adminLoggedOut",false)

  firebase.auth().signOut();
  location.reload()
}

function logoutForVerification(){
  var admin = false
  localStorage.setItem("adminLoggedOut",false)

}




const checkHandler = async() =>{
  document.getElementById("createJoin").style.display = "none";
  document.getElementById("TeamStatus").style.display = "none";

  document.getElementById("loaderTeamStatus").style.display = "block";

  var user = firebase.auth().currentUser;
  var sEmails =user.email.split("@") 
  var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
  Email = Email.concat(use,"@",domain)


  var username =await loadUsername(Email)

  const response = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`)

  const resData = await response.json()

  if(!response.ok || resData === null){
    document.getElementById("createJoin").style.display = "block";

  document.getElementById("loaderTeamStatus").style.display = "none";
    return
  }
  var UniqueCode = Object.values(resData)[0].Code;

  changeUI(UniqueCode)


}

const changeUI = async(UniqueCode) =>{
  document.getElementById("TeamStatus").style.display = "none";


  const response1 = await fetch(`https://hack-6eddc.firebaseio.com/teams/${UniqueCode}.json`)

  const resData2 = await response1.json()

  var teamName = Object.keys(resData2)[0]
  var teamMembers = Object.values(Object.values(Object.values(resData2)[0])[0])
  document.getElementById("teamUniqueCode").innerHTML = UniqueCode;
  document.getElementById("loaderTeamStatus").style.display = "none";
  document.getElementById("TeamStatus").style.display = "block";
  document.getElementById("teamNameLoad").innerHTML = teamName;

  document.getElementById("memberName").innerHTML = ""
  console.log("Usadfgdsfghf",UniqueCode);

  for (var key in teamMembers) {
    document.getElementById("memberName").innerHTML +=
    `<li>${teamMembers[key]}</li>`;   }
    console.log(teamMembers);
}

const switchHandler = async(current) =>{



  if(current == "application"){
    document.getElementById("dasboard").style.display = "none";
    document.getElementById("application").style.display = "block";
    document.getElementById("team").style.display = "none";
    // document.getElementById("Admin").style.display = "none";

    document.getElementById("a").classList.add("active");
    document.getElementById("d").classList.remove("active");
    document.getElementById("t").classList.remove("active");
    // document.getElementById("A").classList.remove("active");
  }
  else if(current == "dasboard"){
    document.getElementById("dasboard").style.display = "block";
    document.getElementById("application").style.display = "none";
    document.getElementById("team").style.display = "none";
    // document.getElementById("Admin").style.display = "none";

    document.getElementById("a").classList.remove("active");
    document.getElementById("d").classList.add("active");
    document.getElementById("t").classList.remove("active");
    // document.getElementById("A").classList.remove("active");
  }
  else if(current == "team"){
    document.getElementById("dasboard").style.display = "none";
    document.getElementById("application").style.display = "none";
    document.getElementById("team").style.display = "block";
    // document.getElementById("Admin").style.display = "none";

    document.getElementById("a").classList.remove("active");
    document.getElementById("d").classList.remove("active");
    document.getElementById("t").classList.add("active");
    // document.getElementById("A").classList.remove("active");
  }
  else if(current == "Admin"){
    document.getElementById("dasboard").style.display = "none";
    document.getElementById("application").style.display = "none";
    document.getElementById("team").style.display = "none";
    // document.getElementById("Admin").style.display = "block";

    document.getElementById("a").classList.remove("active");
    document.getElementById("d").classList.remove("active");
    document.getElementById("t").classList.remove("active");
    // document.getElementById("A").classList.add("active");
  }


}

const loadUsername = async (Email) =>{

  const response = await fetch(`https://hack-6eddc.firebaseio.com/participants/${Email}.json`)
  const resData = await response.json()
  console.log(`https://hack-6eddc.firebaseio.com/participants/${Email}.json`);
  // if(!response.ok || resData === null){
  //   return
  // }
  var username = Object.values(resData)[0].username

  return username
}

const load = async() =>{
  if(flag){
  document.getElementById("user_div").style.display = "none";
    document.getElementById("container-login").style.display = "none";}
  document.getElementById("mainLoader").style.display = "flex";



  var str = window.location.toString()

  if(second){
    document.getElementById("second").style.display = "flex";
    document.getElementById("removeSub").style.display = "block";
    document.getElementById("addSub").style.display = "none";

  }
  else{
    document.getElementById("second").style.display = "none";
    document.getElementById("removeSub").style.display = "none";
    document.getElementById("addSub").style.display = "block";


  }



  if(str.substring(str.length,str.length-11) == "application"){
    document.getElementById("dasboard").style.display = "none";
    document.getElementById("application").style.display = "block";
    document.getElementById("team").style.display = "none";
    // document.getElementById("Admin").style.display = "none";

    document.getElementById("a").classList.add("active");
    document.getElementById("d").classList.remove("active");
    document.getElementById("t").classList.remove("active");
    // document.getElementById("A").classList.remove("active");
  }
  else if(str.substring(str.length,str.length-8) == "dasboard"){
    document.getElementById("dasboard").style.display = "block";
    document.getElementById("application").style.display = "none";
    document.getElementById("team").style.display = "none";
    // document.getElementById("Admin").style.display = "none";

    document.getElementById("a").classList.remove("active");
    document.getElementById("d").classList.add("active");
    document.getElementById("t").classList.remove("active");
    // document.getElementById("A").classList.remove("active");
  }
  else if(str.substring(str.length,str.length-4) == "team"){
    document.getElementById("dasboard").style.display = "none";
    document.getElementById("application").style.display = "none";
    document.getElementById("team").style.display = "block";
    // document.getElementById("Admin").style.display = "none";


    document.getElementById("a").classList.remove("active");
    document.getElementById("d").classList.remove("active");
    document.getElementById("t").classList.add("active");
    // document.getElementById("A").classList.remove("active");




  }
  else if(str.substring(str.length,str.length-5) == "Admin"){
    console.log("admin",admin);
    if(admin === false){
      window.location.replace('./auth.html#dashboard')
    }
    else{
    document.getElementById("dasboard").style.display = "none";
    document.getElementById("application").style.display = "none";
    document.getElementById("team").style.display = "none";
    // document.getElementById("Admin").style.display = "block";

    document.getElementById("a").classList.remove("active");
    document.getElementById("d").classList.remove("active");
    document.getElementById("t").classList.remove("active");
    // document.getElementById("A").classList.add("active");
    }
  }

  document.getElementById("mainLoader").style.display = "none";
}

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}



const teamNameHandler = async() => {
  document.getElementById("createJoin").style.display = "none";
  document.getElementById("TeamStatus").style.display = "none";

  document.getElementById("loaderTeamStatus").style.display = "block";

  var user = firebase.auth().currentUser;
  var sEmails =user.email.split("@") 
  var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
  var Email = Email.concat(use,"@",domain)

  

  var username =await loadUsername(Email)


  var teamNameV = document.getElementById("teamName").value
  if(teamNameV === ""){
    alert("Please enter a Team Name")
    document.getElementById("createJoin").style.display = "block";
  document.getElementById("TeamStatus").style.display = "none";

  document.getElementById("loaderTeamStatus").style.display = "none";
    return
  }
  document.getElementById("loader").style.display = "block";
  document.getElementById("teamSubmitBtn").style.display = "none";
  var uniqueId = makeid(4)


  const response1 = await fetch(`https://hack-6eddc.firebaseio.com/teams.json`)
  const resData = await response1.json()
  if(resData){
  var arr = Object.values(resData)
  for(key in arr){
    var prev = Object.values(arr[key])[0]
    var name = Object.values(Object.values(prev)[0])[1]
    if(name === teamNameV){

      document.getElementById("loader").style.display = "none";
      document.getElementById("teamSubmitBtn").style.display = "block";
      alert("Team name already Taken")
      return
    }
  }}
  var temp = user.email
  const response = await fetch(`https://hack-6eddc.firebaseio.com/teams/${uniqueId}/${teamNameV}.json`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      [Email]:username
    })
})


const response2 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "Team Name":teamNameV,
      "Code":uniqueId

    })
})

if(!response.ok || !response2.ok){
    const errorResData = await response2.json()

    document.getElementById("loader").style.display = "none";
    document.getElementById("teamSubmitBtn").style.display = "block";

    alert("Somthing went Wrong please Try again")
    return

}

changeUI(uniqueId)


 document.getElementById("loader").style.display = "none";
// document.getElementById("teamSubmitBtn").style.display = "block";
// document.getElementById("inputTeamNameDiv").style.display = "none";
// document.getElementById("teamDetialDiv").style.display = "grid";



}


const leaveTeamHandler = async() =>{
  document.getElementById("createJoin").style.display = "none";
  document.getElementById("TeamStatus").style.display = "none";

  document.getElementById("loaderTeamStatus").style.display = "block";

  var user = firebase.auth().currentUser;


  var sEmails =user.email.split("@") 
  var  use=sEmails[0].replace(/\./g,'"dot"')
  var domain=sEmails[1].replace(/\./g,'"dot"')
  var Email = ""
  Email = Email.concat(use,"@",domain)
  var username =await loadUsername(Email)
  const response1 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`)

  const resData = await response1.json()
  var UniqueCode = Object.values(resData)[0].Code;
  var teamName = Object.values(resData)[0]['Team Name'];
  console.log(teamName);

  const response2 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`,{
			method:'DELETE'
		})

		if(!response2.ok){
			alert("somthing went wrong")
    }

  const response3 = await fetch(`https://hack-6eddc.firebaseio.com/teams/${UniqueCode}/${teamName}.json`)
  const resData2 = await response3.json()

  const currentTeamLength = Object.values(Object.values(resData2)[0]).length
  const googleUniqueCode = Object.keys(resData2)[0]
  console.log(googleUniqueCode,Object.keys(Object.values(resData2)[0]));
  if(currentTeamLength <= 1){
       const response4 = await fetch(`https://hack-6eddc.firebaseio.com/teams/${UniqueCode}.json`,{
			method:'DELETE'
		})

		if(!response4.ok){
			alert("somthing went wrong")
    }

    const response6 = await fetch(`https://hack-6eddc.firebaseio.com/roundOneSubmissions/${UniqueCode}.json`,{
			method:'DELETE'
    })
    
    

    document.getElementById("loaderTeamStatus").style.display = "none";
    document.getElementById("createJoin").style.display = "block";
    document.getElementById("teamSubmitBtn").style.display = "block";


  document.getElementById("TeamStatus").style.display = "none";
  location.reload()
  return

  }

    const response5 = await fetch(`https://hack-6eddc.firebaseio.com/teams/${UniqueCode}/${teamName}/${googleUniqueCode}/${Email}.json`,{
			method:'DELETE'
		})

		if(!response5.ok){
      alert("somthing went wrong")
    }
    document.getElementById("loaderTeamStatus").style.display = "none";
    document.getElementById("createJoin").style.display = "block";
    document.getElementById("teamSubmitBtn").style.display = "block";
  document.getElementById("TeamStatus").style.display = "none";

  location.reload()


}



const teamJoinHandler = async() =>{
  document.getElementById("createJoin").style.display = "none";
  document.getElementById("TeamStatus").style.display = "none";

  document.getElementById("loaderTeamStatus").style.display = "block";

  var user = firebase.auth().currentUser;


  var sEmails =user.email.split("@") 
  var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
  Email = Email.concat(use,"@",domain)
  var username =await loadUsername(Email)


  var teamCode = document.getElementById("teamCode").value

  if(teamCode === "" || teamCode.length !=4){
    alert("Please enter a valid Team Code")
    document.getElementById("createJoin").style.display = "block";
  document.getElementById("TeamStatus").style.display = "none";

  document.getElementById("loaderTeamStatus").style.display = "none";
    return
  }

  const response = await fetch(`https://hack-6eddc.firebaseio.com/teams/${teamCode}.json`)
  const resData = await response.json()
  if(resData === null){
    alert("Team not found")
    document.getElementById("createJoin").style.display = "block";
  document.getElementById("TeamStatus").style.display = "none";

  document.getElementById("loaderTeamStatus").style.display = "none";
    return
  }
  const teamName = Object.keys(resData)[0]
  const googleUniqueCode = Object.keys(Object.values(resData)[0])[0]
  var teamLength = Object.keys(Object.values(Object.values(resData)[0])[0]).length
  
  if(teamLength === 5){
    document.getElementById("loaderTeamStatus").style.display = "none";
    document.getElementById("createJoin").style.display = "block";
    document.getElementById("TeamStatus").style.display = "none";

    alert("Team is full")
    return
  }

  const response2 = await fetch(`https://hack-6eddc.firebaseio.com/teams/${teamCode}/${teamName}/${googleUniqueCode}.json`,{
    method:'PATCH',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      [Email]:username
    })
  })


  const response3 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`,{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "Team Name":teamName,
      "Code":teamCode

    })
})

  changeUI(teamCode)
}


const checkAdmin = async(Email) =>{
  const response = await fetch("https://hack-6eddc.firebaseio.com/Admin.json")
  const resData = await response.json()
  const adminArray = Object.keys(resData)
  for (var key in adminArray){
    if(Email === adminArray[key]){
      return true

    }
  }
  return false


}






const varification = async() =>{
    const user = firebase.auth().currentUser
    
    user.sendEmailVerification().then(function(){
      logout()
    }).catch(function(error){
      alert(error)
    })
}


const submissionHandler = async() =>{
 
   
  
  
  var currDate = new Date()
  var startFirstSubmissionDate = new Date(2020,9,24,00,00,00) 

  var lastFirstSubmissionDate = new Date(2021,10,9,00,00,00)
  if(currDate < lastFirstSubmissionDate) {
    // document.getElementById("status").innerHTML = "Registered Successfully ";
    // document.getElementById("removeSub").style.display = "none"
    // document.getElementById("addSub").style.display = "none"
    // document.getElementById("startInfo").innerHTML = `<strong >Submission for Round 1 will start on</br> ${startFirstSubmissionDate}</strong>`

    var user = firebase.auth().currentUser;
    if(user){
        var sEmails =user.email.split("@") 
        var  use=sEmails[0].replace(/\./g,'"dot"')
        var domain=sEmails[1].replace(/\./g,'"dot"')
        var Email = ""
        Email = Email.concat(use,"@",domain)
        const response1 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`)

        const resData1 = await response1.json()
        
        if(resData1){
          
        var teamName = Object.values(Object.values(resData1)[0])[1]
        var teamCode = Object.values(Object.values(resData1)[0])[0]

        const response = await fetch(`https://hack-6eddc.firebaseio.com/roundOneSubmissions.json`)
        const resData = await response.json()

        if(resData){
        var arr = Object.keys(resData)

        var ps = ""
        var pss1 = ""
        for(var key in arr){
          if(teamCode === arr[key]){
            if(Object.values(resData[teamCode])[0].SubmissionOne){
            var frezedOne = Object.values(resData[teamCode])[0].SubmissionOne.freezedOne
            var ps = ps.concat((Object.values(resData[teamCode])[0].SubmissionOne.ProblemStatement).split("@")[0].replace(/\s+/g, ''))
            console.log("ps",ps);

            var idea = Object.values(resData[teamCode])[0].SubmissionOne.Idea}
            
            if(ps === "ConnectedPlatform" || ps === "ADASSoftwarealgorithms" || ps === "InVehicleInfrastructure"){

              var pss1 = pss1.concat((Object.values(resData[teamCode])[0].SubmissionOne.ProblemStatement).split("@")[2].replace(/\s+/g,""),"0")

            }


          }
        }
        console.log("pss1",pss1,ps);
        
          var ps2 = ""
          var pss2 = ""
          for(var key in arr){
            if(teamCode === arr[key]){
              if(Object.values(resData[teamCode])[0].SubmissionSecond){
              var frezedSecond = Object.values(resData[teamCode])[0].SubmissionSecond.freezedSecond

              var ps2 = ps2.concat((Object.values(resData[teamCode])[0].SubmissionSecond.ProblemStatement).split("@")[0].replace(/\s+/g, ''),"1")
              var idea2 = Object.values(resData[teamCode])[0].SubmissionSecond.Idea}

              if(ps === "ConnectedPlatform1" || ps === "ADASSoftwarealgorithms1" || ps === "InVehicleInfrastructure1"){

              var pss2 = pss2.concat((Object.values(resData[teamCode])[0].SubmissionSecond.ProblemStatement).split("@")[2].replace(/\s+/g, ''))
              }
            }
          }
      }
        if(ps || ps2){
        if(Object.values(resData[teamCode])[0].SubmissionOne || Object.values(resData[teamCode])[0].SubmissionSecond){
          document.getElementById("status").innerHTML = "Under Review ";
          
        }
        else{
          
          document.getElementById("status").innerHTML = "Application Incomplete";
        }}
        else{
          
          document.getElementById("status").innerHTML = "Application Incomplete";
        }
        if(ps && idea){
        document.getElementById(ps).checked = true
        if(pss1){
        document.getElementById(pss1).checked = true}

        document.getElementById("comment_textOne").innerHTML = idea
        if(frezedOne){
          console.log("should go");
          frezeHandlerFirst()
        }
      }
        if(ps2 && idea2){
        document.getElementById(ps2).checked = true
          if(pss2){
          document.getElementById(pss2).checked = true}

        document.getElementById("comment_textSecond").innerHTML = idea2
        if(frezedSecond){
          console.log("sdfghjsdfg");
          frezeHandlerSecond()
        }
        
      }

        
        document.getElementById("startInfo").innerHTML = `<strong >This Round will end on </br> 9th Nov 2020, please submit your application before this.</strong>`
        document.getElementById("submissionOne").style.display = "block";
        
       // document.getElementById("addSub").style.display = "block";
        

        }
        else{
          
          document.getElementById("status").innerHTML = "Please create Your Team ";
          document.getElementById("startInfo").innerHTML = `<strong >This Round will end on </br> 9th Nov 2020, please create your team first and submit your application before this.</strong>`
          document.getElementById("addSub").style.display = "none";
          document.getElementById("removeSub").style.display = "none";
          document.getElementById("submissionOne").style.display = "none";
          





        }
    }

  }
  else if(currDate >= lastFirstSubmissionDate){
    document.getElementById("hideLeave").style.display = "none"
    var accBool = false
    var rejBool = false
    var user = firebase.auth().currentUser;
    var sEmails =user.email.split("@") 
    var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
    Email = Email.concat(use,"@",domain)
    const response6 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`)

    const resData6 = await response6.json()



    if(resData6){
    const response = await fetch("https://hack-6eddc.firebaseio.com/roundOneAccepted.json")
    const resData = await response.json()
      
    const acceptedArr  = Object.values(resData)

    const response1 = await fetch("https://hack-6eddc.firebaseio.com/roundOneRejected.json")
    const resData1 = await response1.json()
      
    const rejectedArr= Object.values(resData1)
    
    var user = firebase.auth().currentUser;
    if(user){
        var sEmails =user.email.split("@") 
        var  use=sEmails[0].replace(/\./g,'"dot"')
        var domain=sEmails[1].replace(/\./g,'"dot"')
        var Email = ""
        Email = Email.concat(use,"@",domain)
        if(resData1){       
        for(var key in rejectedArr){
          if(rejectedArr[key].mate === Email){
            console.log("dfg");
            document.getElementById("status").innerHTML = "Rejected";  
            document.getElementById("startInfo").innerHTML = `<strong >Your application has been rejected since we received more applicants than we could admit this year. We'll be sure to reach out if we open up more spots!.</strong>`
            var rejBool = true
            break
          }
        }}
        if(resData){
        for(var key in acceptedArr){
          if(acceptedArr[key].mate === Email){
            
            document.getElementById("status").innerHTML = "Accepted";  
            document.getElementById("startInfo").innerHTML = `<strong >Congratulations you have been selected for the next round which will start on Oct 30,2020 .</strong>`
            
            document.getElementById("displayStatusDis").innerHTML = '<strong >Next round will start on Oct 30,2020.</strong>'
            document.getElementById("addSub").style.display = "none";
            document.getElementById("removeSub").style.display = "none";
            document.getElementById("submissionOne").style.display = "none";
            var accBool = true
            break
          }
        }}
      }
      if(accBool == false && rejBool == false){
        document.getElementById("status").innerHTML = "Under Review ";
        document.getElementById("startInfo").innerHTML = `<strong >Your application is under review.</strong>`
        document.getElementById("displayStatusDis").innerHTML = '<strong >Next round will start on Oct 30,2020.</strong>'
            document.getElementById("addSub").style.display = "none";
            document.getElementById("removeSub").style.display = "none";
            document.getElementById("submissionOne").style.display = "none";
      }
}
else{
  document.getElementById("status").innerHTML = "Rejected";
  document.getElementById("startInfo").innerHTML = `<strong >Your application has been Rejected since since you have not made any submission.</strong>`
  document.getElementById("teamMsg").innerHTML = `<strong >Team not created.</strong>`
  document.getElementById("addSub").style.display = "none";
  document.getElementById("removeSub").style.display = "none";
  document.getElementById("submissionOne").style.display = "none";
  document.getElementById("TeamJoin").style.display = "none";

}
    
  }
}


const addSubmission = () =>{
  document.getElementById("second").style.display = "flex";
  localStorage.setItem("second",true)
  document.getElementById("removeSub").style.display = "block";
  document.getElementById("addSub").style.display = "none";
}

const removeSubmission = () =>{
  document.getElementById("second").style.display = "none";
  localStorage.setItem("second",false)
  document.getElementById("removeSub").style.display = "none";
  document.getElementById("addSub").style.display = "block";
}


const submissionSubmitHandler = async() =>{
  var problemArrId = ["DigitalmanualfortheCar","InstrumentClusterStackbasedonRealtimeOS","ADASSoftwarealgorithms","InVehicleInfrastructure","CarastheThirdLivingSpace","ConnectedPlatform"]
  var connectedSubArr = ["SmartParking0","PredictiveMaintenance0","AconnectedPlatformusedbyMalls0","Usertraveling0"]
  var adasSubArr = ["Emotionrecognitionofdriver0","Stationaryvehicle0","Blindspotdetectionwhiledriving0","RiderAssistance0","VehicleTelematics0",'Whattechnologies0',"Sensingenvironment0"]
  var inVehicleSubArr = ["AntiTheftMonitoringSystems0","InfantIdentification0","Passengeroccupancy0","Cabinairqualitymonitoring0","dataanalytics0",'decentralizedlockingsystem0',"oxygencontent0"]

  var ideaDescriptionOne = document.getElementById("comment_textOne").value
  for (var key in problemArrId){
    
    if(document.getElementById(problemArrId[key]).checked){
      var value = document.getElementById(problemArrId[key]).value
      break
    }
  }


  if(value === "Connected Platform"){
    for (var key in connectedSubArr){
      if(document.getElementById(connectedSubArr[key]).checked){
        var subValue = document.getElementById(connectedSubArr[key]).value
        break
      }
    }
    var temp = ""
    var temp = temp.concat(value,"@Selected Problem Statement@",subValue)
    var value = temp
  }
  
  
  
  
  
  if(value === "ADAS Software algorithms"){
    for (var key in adasSubArr){
      if(document.getElementById(adasSubArr[key]).checked){
        var subValue = document.getElementById(adasSubArr[key]).value
        break
      }
    }
    var temp = ""
    var temp = temp.concat(value,"@Selected Problem Statement@",subValue)
    var value = temp
  }



  if(value === "In Vehicle Infrastructure"){
    for (var key in inVehicleSubArr){
      if(document.getElementById(inVehicleSubArr[key]).checked){
        var subValue = document.getElementById(inVehicleSubArr[key]).value
        break
      }
    }
    var temp = ""
    var temp = temp.concat(value,"@Selected Problem Statement@",subValue)
    var value = temp
  }
  
  
  
  
  
  
  
  
  
 
  console.log(value,ideaDescriptionOne);
  var user = firebase.auth().currentUser;

  var sEmails =user.email.split("@") 
  var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
  Email = Email.concat(use,"@",domain)
  const response1 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`)

  const resData = await response1.json()
  var teamName = Object.values(Object.values(resData)[0])[1]
  var teamCode = Object.values(Object.values(resData)[0])[0]
  const response = await fetch(`https://hack-6eddc.firebaseio.com/roundOneSubmissions/${teamCode}/${teamName}/SubmissionOne.json`,{
    method:'PATCH',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "ProblemStatement":value,
      "Idea":ideaDescriptionOne,
      "freezedOne":false

    })
})
console.log(Object.values(Object.values(resData)[0])[1]);

}


const submissionSubmitHandlerSecond = async() =>{
  var problemArrId = ["DigitalmanualfortheCar1","InstrumentClusterStackbasedonRealtimeOS1","ADASSoftwarealgorithms1","InVehicleInfrastructure1","CarastheThirdLivingSpace1","ConnectedPlatform1"]
  var ideaDescriptionOne = document.getElementById("comment_textSecond").value
  
  var connectedSubArr = ["SmartParking","PredictiveMaintenance","AconnectedPlatformusedbyMalls","Usertraveling"]
  var adasSubArr = ["Emotionrecognitionofdriver","Stationaryvehicle","Blindspotdetectionwhiledriving","RiderAssistance","VehicleTelematics",'Whattechnologies',"Sensingenvironment"]
  var inVehicleSubArr = ["AntiTheftMonitoringSystems","InfantIdentification","Passengeroccupancy","Cabinairqualitymonitoring","dataanalytics",'decentralizedlockingsystem',"oxygencontent"]

  for (var key in problemArrId){
    if(document.getElementById(problemArrId[key]).checked){
      var value = document.getElementById(problemArrId[key]).value
      break
    }
  }

  if(value === "Connected Platform"){
    for (var key in connectedSubArr){
      if(document.getElementById(connectedSubArr[key]).checked){
        var subValue = document.getElementById(connectedSubArr[key]).value
        break
      }
    }
    var temp = ""
    var temp = temp.concat(value,"@Selected Problem Statement@",subValue)
    var value = temp
  }



  if(value === "ADAS Software algorithms"){
    for (var key in adasSubArr){
      if(document.getElementById(adasSubArr[key]).checked){
        var subValue = document.getElementById(adasSubArr[key]).value
        break
      }
    }
    var temp = ""
    var temp = temp.concat(value,"@Selected Problem Statement@",subValue)
    var value = temp
  }



  if(value === "In Vehicle Infrastructure"){
    for (var key in inVehicleSubArr){
      console.log(inVehicleSubArr[key]);
      if(document.getElementById(inVehicleSubArr[key]).checked){
        var subValue = document.getElementById(inVehicleSubArr[key]).value
        break
      }
    }
    var temp = ""
    var temp = temp.concat(value,"@Selected Problem Statement@",subValue)
    var value = temp
  }


  
  console.log(value,ideaDescriptionOne);
  var user = firebase.auth().currentUser;

  var sEmails =user.email.split("@") 
  var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
  Email = Email.concat(use,"@",domain)
  const response1 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`)

  const resData = await response1.json()
  var teamName = Object.values(Object.values(resData)[0])[1]
  var teamCode = Object.values(Object.values(resData)[0])[0]
  const response = await fetch(`https://hack-6eddc.firebaseio.com/roundOneSubmissions/${teamCode}/${teamName}/SubmissionSecond.json`,{
    method:'PATCH',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "ProblemStatement":value,
      "Idea":ideaDescriptionOne,
      "freezedSecond":false

    })
})
console.log(Object.values(Object.values(resData)[0])[1]);
}


const displayProblem = () =>{
  var problemArrId = ["DigitalmanualfortheCar","InstrumentClusterStackbasedonRealtimeOS","ADASSoftwarealgorithms","InVehicleInfrastructure","CarastheThirdLivingSpace","ConnectedPlatform"]
  for(var key in problemArrId){
  if(document.getElementById(problemArrId[key]).checked){
    var temp = ""
    temp = temp.concat(problemArrId[key],"problem")
    if(document.getElementById(temp).style.display === "none"){
    
    document.getElementById(temp).style.display = "block"
  }else{
    
    document.getElementById(temp).style.display = "none"
  }
  }
  else{
    var temp = ""
    temp = temp.concat(problemArrId[key],"problem")
    document.getElementById(temp).style.display = "none"
  }
  }
}


const displayProblem2 = () =>{
  var problemArrId = ["DigitalmanualfortheCar1","InstrumentClusterStackbasedonRealtimeOS1","ADASSoftwarealgorithms1","InVehicleInfrastructure1","CarastheThirdLivingSpace1","ConnectedPlatform1"]
  for(var key in problemArrId){
  if(document.getElementById(problemArrId[key]).checked){
    var temp = ""
    temp = temp.concat(problemArrId[key],"problem")
    if(document.getElementById(temp).style.display === "none"){
    
    document.getElementById(temp).style.display = "block"
  }
    else{
    
    document.getElementById(temp).style.display = "none"
    }
  }
  else{
    var temp = ""
    temp = temp.concat(problemArrId[key],"problem")
    document.getElementById(temp).style.display = "none"
  }
  }
}

const frezeHandlerFirst = async() =>{


  
  
  var problemArrId = ["DigitalmanualfortheCar","InstrumentClusterStackbasedonRealtimeOS","ADASSoftwarealgorithms","InVehicleInfrastructure","CarastheThirdLivingSpace","ConnectedPlatform"]
  localStorage.setItem("frezedOne",true)
  var inVehicleSubArr = ["AntiTheftMonitoringSystems0","InfantIdentification0","Passengeroccupancy0","Cabinairqualitymonitoring0","dataanalytics0",'decentralizedlockingsystem0',"oxygencontent0"]

  for(var key in problemArrId){
    
    var temp = ""
    temp = temp.concat(problemArrId[key])
    document.getElementById(temp).disabled = "true";
  }
  document.getElementById("comment_textOne").disabled = true;

  changeColor("rgb(233, 236, 239) !important") 


  var ideaDescriptionOne = document.getElementById("comment_textOne").value
  var connectedSubArr = ["SmartParking0","PredictiveMaintenance0","AconnectedPlatformusedbyMalls0","Usertraveling0"]
  var adasSubArr = ["Emotionrecognitionofdriver0","Stationaryvehicle0","Blindspotdetectionwhiledriving0","RiderAssistance0","VehicleTelematics0",'Whattechnologies0',"Sensingenvironment0"]

  for (var key in problemArrId){
    
    if(document.getElementById(problemArrId[key]).checked){
      var value = document.getElementById(problemArrId[key]).value
      break
    }
  }
  for(var key in connectedSubArr){
    
    var temp2 = ""
    temp2 = temp2.concat(connectedSubArr[key])
    document.getElementById(temp2).disabled = "true";
  }

  for(var key in adasSubArr){
    
    var temp2 = ""
    temp2 = temp2.concat(adasSubArr[key])
    document.getElementById(temp2).disabled = "true";
  }


  for(var key in inVehicleSubArr){
    
    var temp2 = ""
    temp2 = temp2.concat(inVehicleSubArr[key])
    document.getElementById(temp2).disabled = "true";
  }
  console.log(value,ideaDescriptionOne);

  if(value === "Connected Platform"){
    for (var key in connectedSubArr){
      if(document.getElementById(connectedSubArr[key]).checked){
        var subValue = document.getElementById(connectedSubArr[key]).value
        break
      }
    }
    var temp3 = ""
  var temp3 = temp3.concat(value,"@Selected Problem Statement@",subValue)
  var value = temp3
  }

  if(value === "ADAS Software algorithms"){
    for (var key in adasSubArr){
      if(document.getElementById(adasSubArr[key]).checked){
        var subValue = document.getElementById(adasSubArr[key]).value
        break
      }
    }
    var temp3 = ""
  var temp3 = temp3.concat(value,"@Selected Problem Statement@",subValue)
  var value = temp3
  }


  if(value === "In Vehicle Infrastructure"){
    for (var key in inVehicleSubArr){
      if(document.getElementById(inVehicleSubArr[key]).checked){
        var subValue = document.getElementById(inVehicleSubArr[key]).value
        break
      }
    }
    var temp3 = ""
  var temp3 = temp3.concat(value,"@Selected Problem Statement@",subValue)
  var value = temp3
  }

  var user = firebase.auth().currentUser;

  var sEmails =user.email.split("@") 
  var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
  Email = Email.concat(use,"@",domain)
  const response1 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`)

  const resData = await response1.json()
  var teamName = Object.values(Object.values(resData)[0])[1]
  var teamCode = Object.values(Object.values(resData)[0])[0]
  const response = await fetch(`https://hack-6eddc.firebaseio.com/roundOneSubmissions/${teamCode}/${teamName}/SubmissionOne.json`,{
    method:'PATCH',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "ProblemStatement":value,
      "Idea":ideaDescriptionOne,
      "freezedOne":true

    })
})

  
}



const frezeHandlerSecond = async() =>{
  
  var problemArrId = ["DigitalmanualfortheCar1","InstrumentClusterStackbasedonRealtimeOS1","ADASSoftwarealgorithms1","InVehicleInfrastructure1","CarastheThirdLivingSpace1","ConnectedPlatform1"]
  localStorage.setItem("frezedSecond",true)
  var connectedSubArr = ["SmartParking","PredictiveMaintenance","AconnectedPlatformusedbyMalls","Usertraveling"]
  var adasSubArr = ["Emotionrecognitionofdriver","Stationaryvehicle","Blindspotdetectionwhiledriving","RiderAssistance","VehicleTelematics",'Whattechnologies',"Sensingenvironment"]
  var inVehicleSubArr = ["AntiTheftMonitoringSystems","InfantIdentification","Passengeroccupancy","Cabinairqualitymonitoring","dataanalytics",'decentralizedlockingsystem',"oxygencontent"]

  for(var key in problemArrId){
    
    var temp = ""
    temp = temp.concat(problemArrId[key])
    document.getElementById(temp).disabled = "true";
  }
  for(var key in connectedSubArr){
    
    var temp2 = ""
    temp2 = temp2.concat(connectedSubArr[key])
    document.getElementById(temp2).disabled = "true";
  }

  for(var key in adasSubArr){
    
    var temp2 = ""
    temp2 = temp2.concat(adasSubArr[key])
    document.getElementById(temp2).disabled = "true";
  }


  document.getElementById("comment_textSecond").disabled = true;

  changeColorSecond("rgb(233, 236, 239) !important") 


  var problemArrId = ["DigitalmanualfortheCar1","InstrumentClusterStackbasedonRealtimeOS1","ADASSoftwarealgorithms1","InVehicleInfrastructure1","CarastheThirdLivingSpace1","ConnectedPlatform1"]
  var ideaDescriptionOne = document.getElementById("comment_textSecond").value
  for (var key in problemArrId){
    
    if(document.getElementById(problemArrId[key]).checked){
      var value = document.getElementById(problemArrId[key]).value
      break
    }
  }


  if(value === "Connected Platform"){
    for (var key in connectedSubArr){
      if(document.getElementById(connectedSubArr[key]).checked){
        var subValue = document.getElementById(connectedSubArr[key]).value
        break
      }
    }
    var temp3 = ""
  var temp3 = temp3.concat(value,"@Selected Problem Statement@",subValue)
  var value = temp3
  }



  if(value === "ADAS Software algorithms"){
    for (var key in adasSubArr){
      if(document.getElementById(adasSubArr[key]).checked){
        var subValue = document.getElementById(adasSubArr[key]).value
        break
      }
    }
    var temp3 = ""
  var temp3 = temp3.concat(value,"@Selected Problem Statement@",subValue)
  var value = temp3
  }
  
  if(value === "In Vehicle Infrastructure"){
    for (var key in inVehicleSubArr){
      if(document.getElementById(inVehicleSubArr[key]).checked){
        var subValue = document.getElementById(inVehicleSubArr[key]).value
        break
      }
    }
    var temp = ""
    var temp = temp.concat(value,"@Selected Problem Statement@",subValue)
    var value = temp
  }
  console.log(value,ideaDescriptionOne);
  var user = firebase.auth().currentUser;

  var sEmails =user.email.split("@") 
  var  use=sEmails[0].replace(/\./g,'"dot"')
    var domain=sEmails[1].replace(/\./g,'"dot"')
    var Email = ""
  Email = Email.concat(use,"@",domain)
  const response1 = await fetch(`https://hack-6eddc.firebaseio.com/inATeam/${Email}.json`)

  const resData = await response1.json()
  var teamName = Object.values(Object.values(resData)[0])[1]
  var teamCode = Object.values(Object.values(resData)[0])[0]
  const response = await fetch(`https://hack-6eddc.firebaseio.com/roundOneSubmissions/${teamCode}/${teamName}/SubmissionSecond.json`,{
    method:'PATCH',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify({
      "ProblemStatement":value,
      "Idea":ideaDescriptionOne,
      "freezedSecond":true

    })
})

}


function changeColor(color) { 
  document.getElementById("removeSaveSubmit").style.display = "none"; 
} 


function changeColorSecond(color) { 
  document.getElementById("removeSaveSubmitSecond").style.display = "none"; 
} 