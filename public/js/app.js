console.log('Client side javascript file is loaded!!')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//        console.log(data)
//     })

// })



const webForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
//messageOne.textContent="ASAD"
webForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    messageOne.textContent='Loading please wait'
    messageTwo.textContent=''
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
              console.log('Error=',data.error)
             messageOne.textContent=data.error
        }
        else{
        console.log("location",data.location)
        console.log("forcaste",data.forecast)
        messageOne.textContent=data.location
        messageTwo.textContent=data.forecast
        }
    })
})
})