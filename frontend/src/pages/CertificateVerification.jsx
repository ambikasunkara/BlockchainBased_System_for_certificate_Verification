import React,{useState} from "react";
import axios from "axios";

function CertificateVerification(){

const [hash,setHash] = useState("");
const [result,setResult] = useState("");

const verify = async()=>{

try{

const res = await axios.get(
`http://localhost:5000/verify-certificate/${hash.trim()}`
);

if(res.data.valid){
setResult("✅ Valid Certificate");
}else{
setResult("❌ Invalid Certificate");
}

}catch{
setResult("❌ Invalid Certificate");
}

};

return(

<div>

<h2>Certificate Verification</h2>

<input
placeholder="Enter Certificate Hash"
value={hash}
onChange={e=>setHash(e.target.value)}
/>

<button onClick={verify}>
Verify Certificate
</button>

<h3>{result}</h3>

</div>

);

}

export default CertificateVerification;