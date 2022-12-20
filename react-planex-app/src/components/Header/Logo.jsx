

export const Logo = (props) => {
    return (

        <div className={props.className}>
            <div id={props.id} className="circle small">
            </div >
            <div id="green" className="circle big">
            </div >

            <p id={props.id === 'beige' ? "logo_name_header":""} className="logo_name">Planex</p>


        </div>

    )

}