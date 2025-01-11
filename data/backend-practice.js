const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
  console.log(xhr.response); //set the event lister first and then click the button
});

xhr.open('GET', 'https://supersimplebackend.dev'); //.open is used to define the method 
xhr.send();//.send sends the define method 

