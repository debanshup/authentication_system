import React from 'react'
import ProfileMenu from './ProfileMenu';
import Link from 'next/link';



interface ProfileLayoutProps {
    children: React.ReactNode;
    fullname: any;
    username: any;
    image: any;
    handler: any
}


const ProfileLayout = ({
    children,
    fullname,
    username,
    image,
    handler

}: ProfileLayoutProps) => {
    return (
        <section>
            {/* Include shared UI here e.g. a header or sidebar */}
            <header className="p-2 text-end bg-light sticky-top shadow-sm">
                <ProfileMenu
                    username={username}
                    fullname={fullname}
                    image={image}
                >
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <a className="text-decoration-none" href={`/profile/${username}`}>
                                <i className="bi bi-person-circle me-2"></i> Your Profile
                            </a>
                        </li>
                        <li className="list-group-item">
                            <Link className="text-decoration-none" href={`./${username}/settings`}>
                                <i className="bi bi-gear-fill me-2"></i> Settings
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link onClick={handler} className="text-decoration-none text-danger" href="/login">
                                <i className="bi bi-box-arrow-right me-2"></i> Log out
                            </Link>
                        </li>
                    </ul>

                </ProfileMenu>
            </header>
            <div className="container">
                {children}
            </div>
        </section>
    )
}

export default ProfileLayout
