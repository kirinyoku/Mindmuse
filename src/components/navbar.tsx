'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const updateProviders = async () => {
      const providers = await getProviders();
      setProviders(providers);
    };

    updateProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/logo.svg" alt="logo" width={30} height={30} className="object-contain" />
        <p className="logo_text">MindMuse</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-post" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={() => signOut()} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user?.image || '/pp_placeholder.png'}
                alt="user profile picture"
                width={37}
                height={37}
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image || '/pp_placeholder.png'}
              alt="user profile picture"
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => toggleDropdown()}
            />
            {isDropdownOpen && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link capitalize"
                  onClick={() => toggleDropdown()}>
                  My Profile
                </Link>
                <Link
                  href="/create-post"
                  className="dropdown_link capitalize"
                  onClick={() => toggleDropdown()}>
                  Create Post
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    toggleDropdown();
                    signOut();
                  }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn">
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
