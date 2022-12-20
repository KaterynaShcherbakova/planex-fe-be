import { async } from "q";
import React, { useState } from "react";
import { useEffect } from "react";
import { apiEditUser, apiGetUser } from "../../api/user_api";
import "./ToggleSwitch.css";

function ToggleSwitch() {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = async () => {
    setIsToggled(!isToggled);
    await apiEditUser({ notifications: !isToggled });
  };

  useEffect(() => async () => {
    setIsToggled((await apiGetUser()).notifications);
  }, []);

  return (
    <div className="notification-cont">

      <label className="toggle-switch">
        <input type="checkbox" checked={isToggled} onChange={onToggle} />
        <span className="switch" />
      </label>
      <p className='setting_title_item' style={{ "marginTop": "0%" }}>Email notifications about events and tasks</p>
    </div>
  );

}
export default ToggleSwitch;