export const checkValidity = (password) => {
    const oneUpperCase = /^.*[A-Z].*$/;
    const length = /^.{8,}$/;
    const underscore = /^(?!_)(?:[^_]*_?[^_]+)?$/;
    const number = /.*[0-9].*/;
    const specialCharacter = /.*[!@#$%&].*/;

    if(!oneUpperCase.test(password))
        return "New password must have at least 1 uppercase letter.";
    
    else if(!length.test(password))
        return "New password must have at least 8 characters.";
    
    else if(!number.test(password))
        return "New password must have at least 1 number.";
    
    else if(!specialCharacter.test(password))
        return "New password must have at least 1 special character.";
    
    else if(!underscore.test(password))
        return "New password must have at most 1 underscore, embedded.";

    else
        return "success";
}