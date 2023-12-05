export default function Dialog({ message, onDialog }) {
    return (
      <div style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        backgroundColor: "rgba(0,0,0,0.5)"
      }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "white",
            padding: "50px"
          }}>
          <h3 style={{ color: "black" }}>{message}</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button onClick={() => onDialog(true)} style={{ backgroundColor: "green", color: "white", marginRight: "4px" }}>Taip</button>
            <button onClick={() => onDialog(false)} style={{ backgroundColor: "red", color: "white", marginLeft: "4px" }}>Ne</button>
          </div>
        </div>
      </div>
    )
}