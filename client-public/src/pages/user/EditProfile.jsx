import { 
  useDispatch, 
  useSelector, 
} from "react-redux"
import instance from "../../configs/instance"
import { 
  useNavigate, 
} from "react-router-dom"
import { setUserFullName } from "../../features/anime/userSlicer"

export default function EditProfile() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user)
  
  async function onSubmitForm(e) {
    e.preventDefault()
    // TODO: handle formData or useState
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    formJson.id = user.userId
    
    try {
      const res = await instance.patch(`/user/${user.userId}`, formJson, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      dispatch(setUserFullName(formJson.fullName))
      navigate(`/user/${user.userId}`)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        // TODO: showError
      } else console.log(error);
    }
    
  }
  
  return (
    <>
      <div className="m-5">
        <h4>Edit Profile</h4>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="full-name" className="form-label">Full Name</label>
          <input 
            type="text" 
            name="fullName" 
            id="full-name" 
            className="form-control" 
            defaultValue={user.userFullName}
          />
          <button 
            type="submit"
            className="btn btn-primary mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}