export default function AppMenu() {

  const footer = {
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
    background: '#4C476B',
    color: "#fff",
    opacity: .8,
    zIndex: 1.,
    textAlign: "center"
  };

  return (
    <footer style={footer}>
      <p><a style={{color: "inherit"}} href="https://www.linkedin.com/in/adri%C3%A1n-bntz">Adrián Benítez</a></p>
    </footer>
  )
}
  