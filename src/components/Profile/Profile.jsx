import css from "./Profile.module.css"


const Profile = ({ name, tag, location, image, stats }) => {
 
    return (
      <div className={css.profile}>
        <div>
          <img className={css.image} src={image} alt={name} />
          <p className={css.nameStyle}>{name}</p>
          <p className={css.tagStyle}>@{tag}</p>
          <p className={css.locationStyle}>{location}</p>
        </div>

        <ul className={css.listStyle}>
          <li className={css.itemStyle}>
            <span>Followers</span>
            <span>{stats.followers}</span>
          </li>
          <li className={css.itemStyle}>
            <span>Views</span>
            <span>{stats.views}</span>
          </li>
          <li className={css.itemStyle}>
            <span>Likes</span>
            <span>{stats.likes}</span>
          </li>
        </ul>
      </div>
    );
}

export default Profile