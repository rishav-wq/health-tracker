import "./profilePage.scss";

function ProfilePage() {
  return (
    <div className="profilePage">
      <div className="title">
        <h1>User Info</h1>
        <button>Update Profile</button>
      </div>

      <div className="info">
        <span>
          Avatar:
          <img
            src="https://tse2.mm.bing.net/th?id=OIP.ErI83UXKIflX1WHxPmgF8AHaHa&pid=Api&P=0&h=220"
            alt="User Avatar"
            className="avatar"
          />
        </span>

        <span>
          Username: <b>Rishav Raj</b>
        </span>

        <span>
          E-mail: <b>test@gmail.com</b>
        </span>

        <span>
          ABC ID: <b>ABC12345</b>
        </span>

        <span>
          Phone Number: <b>+123 456 7890</b>
        </span>

        <span>
          Date of Birth: <b>01/01/1999</b>
        </span>
      </div>
    </div>
  );
}

export default ProfilePage;
