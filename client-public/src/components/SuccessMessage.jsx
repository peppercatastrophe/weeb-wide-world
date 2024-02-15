export default function SuccessMessage(props) {


  return (
    <>
      <div className="alert alert-success" role="alert">
        {props.message ? props.message : 'Register success!'}
      </div>

    </>
  )
}
