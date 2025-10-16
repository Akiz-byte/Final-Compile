import ReactDom from "react-dom"
import { useState,useEffect,useRef } from "react"
import './Tooltip.css'

export default function Tooltip({text,children, currentWord}){
    const [show, setShow] = useState(false)
    const [pos, setPos] = useState({})
    const ref=useRef(null)

    useEffect(()=>{
        if(show && ref.current){
            const rect= ref.current.getBoundingClientRect()
            setPos({
                top: rect.top - 15,
                left: rect.left + rect.width 
            })

        }
    }, [show])

    const tooltip = show && 
        <div className="tooltip" style={{
            position:"fixed",
            top: pos.top,
            left: pos.left,
        }}>
            {text}
        </div>
        
        return(
            <>
                <span
                    ref={ref}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                >
                    {children}
                </span>
                {ReactDom.createPortal(tooltip, document.body)}
            </>
        )
}