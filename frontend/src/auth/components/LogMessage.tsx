interface Props {
    username: string;
    logout: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const LogMessage = ({username, logout}: Props) =>
    <div className="d-inline-flex align-items-center px-3 py-1 rounded-pill bg-light border">
        <span className="text-muted me-1">Logged as</span>
        <strong>{username}</strong> :: 
        <a href="#" onClick={logout} className="ms-1 text-danger text-decoration-none small">Logout</a>
    </div>;

export default LogMessage;