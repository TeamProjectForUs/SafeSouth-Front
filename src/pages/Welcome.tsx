import { Link } from 'react-router-dom';

const btnStyle = 'text-black bg-[white] border-[1px] border-[black] font-bold text-[20px] hover:opacity-[0.8] px-4 py-2 rounded-full';

export default function Welcome() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center">
                <p>!Safe South ברוכים הבאים לאתר שלנו</p>
                <p>,האתר נוצר למען אזרחי המדינה היקרים, אשר בזמן המלחמה נרתמים אחד למען השני</p>
                <p>.ומארחים משפחות מפונות מהדרום / צפון במרכז</p>
                <hr />
                <p>!הצטרפו למטרה, הרתמו לעשייה, וביחד ננצח</p>
            </div>
            <div className="m-4 min-w-[80%] flex flex-row items-center justify-around">
                <Link className={btnStyle} to="/register">אשמח לארח</Link>
                <Link className={btnStyle} to="/feed">אשמח להתארח</Link>
            </div>
        </div>
    );
}
