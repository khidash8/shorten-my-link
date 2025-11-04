import React from "react";
import Link from "next/link";

const LinksContainer = () => {
  return (
    <div className={"flex flex-col justify-start gap-4"}>
      <h2>Recent Links</h2>
      <div className="flex flex-col gap-4">
        <ul>
          <li>
            <Link
              href={"https://www.google.com/"}
              target={"_blank"}
              className={
                "text-muted-foreground hover:text-primary underline underline-offset-4"
              }
            >
              Google
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default LinksContainer;
