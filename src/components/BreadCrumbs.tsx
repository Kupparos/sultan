import React from "react";
import { Link, useLocation } from "react-router-dom";
import style from "../styles/breadCrumbs.module.css";

interface BreadCrumb {
  name: string;
  path: string;
}

export default function BreadCrumbs() {
  const location = useLocation();
  const pathnames = decodeURIComponent(location.pathname)
    .split("/")
    .filter((x) => x);

  const breadcrumbs: BreadCrumb[] = [
    { name: "Каталог", path: "/" },
    ...(pathnames.map((name, index) => ({
      name,
      path: `/${pathnames.slice(0, index + 1).join("/")}`,
    })) || []),
  ];

  return (
    <div className={style.breadCrumbs}>
      <span>
        <Link to="/">Главная</Link>
      </span>
      {breadcrumbs.map(({ name, path }, index) => (
        <span key={path}>
          <Link to={path}>
            {location.state && index === breadcrumbs.length - 1
              ? location.state.item.name
              : name}
          </Link>
        </span>
      ))}
    </div>
  );
}
