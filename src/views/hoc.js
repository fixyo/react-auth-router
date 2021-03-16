const Button = props => {
  const { kind, ...other } = props;
  console.log(other, 'others')
  console.log(props.children)
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

const HelloWorld = (props) => {
  return <div>click meeeeee</div>
}

const App = () => {
  return (
    <div>
      <Button kind="primary" onClick={() => console.log("clicked!")}>
        {/* Hello World!!!!! */}
        <HelloWorld></HelloWorld>
      </Button>
    </div>
  );
};

export default App 