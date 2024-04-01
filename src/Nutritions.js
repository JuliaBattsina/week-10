export const Nutritions = ({ label, quantity, unit }) => {
    return ( <div>
        <div className="container">
            <p><b>{label}</b> - {quantity} {unit}</p>
        </div>
        </div>
    )
}
