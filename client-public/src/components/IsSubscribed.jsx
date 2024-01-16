import { useSelector } from "react-redux"

export default function IsSubscribed() {
  const isSubscribed = useSelector(state=>state.user.IsSubscribed)
  if (isSubscribed) {
    return (
      <>
        <button className="btn btn-primary">
          Subscribed
        </button>
      </>
    )
  }
  return (
    <>
      <button className="btn btn-secondary">
        Not Subscribed
      </button>
    </>
  )
}