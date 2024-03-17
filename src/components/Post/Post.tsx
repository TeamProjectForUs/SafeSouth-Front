import { IPost } from "../../@Types";

export interface IPostProps {
    post: IPost
}

export default function Post({post}: IPostProps) {
    return (
        <div className="p-2" style={{ textAlign: 'right' }}>
            <div>
                {post.post_owner_first_name + "  " + post.post_owner_last_name}
            </div>
            <h1>
                 {post.title}
                 <p>
                    {post.message}
                </p>
                <p>
                    {post.location}, תאריכים: &nbsp; {post.date_start.toDateString()} - {post.date_end.toDateString()}
                </p>
            </h1>
          
            <div className="text-[12px] text-gray d-flex">
                <div className="flex-grow-1">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={post.handicap_home} disabled />
                        בית נגיש לנכים.
                    </label>
                </div>
                <div className="flex-grow-1">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={post.animals_home} disabled />
                        מקבלים חיות מחמד.
                    </label>
                </div>
                <div className="flex-grow-1">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={post.kosher_home} disabled />
                        בית שומר כשרות.
                    </label>
                </div>
                <div className="flex-grow-1">
                    <label className="checkbox-label">
                        <input type="checkbox" checked={post.shabat_save} disabled />
                        בית שומר שבת.
                    </label>
                </div>
            </div>

            <div>
                .יכולים לארח עד: &nbsp;&nbsp; {post.capacity}  נפשות
            </div>
            <div>
                טלפון: &nbsp;&nbsp; {post.post_owner_phone}
            </div>
        
        </div>
    );
}
