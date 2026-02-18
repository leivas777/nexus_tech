import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";


export default function AuthSuccess(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");
        const id = searchParams.get("id");
        const email = searchParams.get("email");
        const tenantId = searchParams.get("tenantId");
        
        if(token) {
            localStorage.setItem( "token", token);
            localStorage.setItem("user", JSON.stringify({ 
                id,
                email,
                tenantId: tenantId || null
             }));
            navigate("/dashboard", { replace: true });
        }else{
            navigate("/auth", { replace: true });
        }
    }, [searchParams, navigate]);
    return <div>Processando login...</div>
}