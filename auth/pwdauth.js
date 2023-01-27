function pwdCheck(pwd1,pwd2){
    if(validatePassword(pwd1)){
        if(pwd1===pwd2){
            return true
        }else{
            return false
        }
    }else{
        return false
    }

  
}

function validatePassword (pwd1){
    console.log(pwd1)
    if(pwd1.length>8 && pwd1.length<20){
        console.log('i am here');
        var re=/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9])(?=.\W)/;
        console.log("first check",re.test(pwd1))
        return re.test(pwd1);

    }else{
        return false
    }

}

export {pwdCheck,validatePassword};

