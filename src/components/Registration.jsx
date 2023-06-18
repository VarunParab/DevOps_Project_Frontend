import React,{useState}from 'react'
import axios from 'axios'
import { MDBBtn,MDBContainer,MDBCard,MDBCardBody,MDBCol,MDBRow,MDBInput,} from 'mdb-react-ui-kit'
function Registration() {
const [value,setValue]= useState('');
const onChangeValue= e=> {
  let value = e.target.value;
  setValue(value);
}
const handleButtonClick = e => {
  e.preventDefault();
  const data = {
    email: value
  };
  axios.post('http://localhost:4000/register', data)
  .then(res => {
    console.log(res.data);
    alert("You have successfully subscribed to our Newsletter")
  })
  .catch(err => {
    console.log(err);
  });
};
return (
        <MDBContainer fluid>
          <form>
          <div className="p-5 bg-image" style={{backgroundImage: 'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)', height: '300px'}}></div>
    
          <MDBCard className='mx-5 mb-5 p-5 shadow-5' style={{marginTop: '-100px', background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 text-center'>
    
              <h2 className="fw-bold mb-5">Sign up for our Newsletter</h2>
    
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text'/>
                </MDBCol>
    
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form1' type='text'/>
                </MDBCol>
              </MDBRow>
    
              <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='text' value={value} onChange={onChangeValue}/>
    
              <MDBBtn className='w-100 mb-4' size='md' onClick={handleButtonClick}>sign up</MDBBtn>
    
            </MDBCardBody>
          </MDBCard>
          </form>
        </MDBContainer>
  );
}
export default Registration
