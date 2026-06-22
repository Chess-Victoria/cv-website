'use client'
import { SITE_CONFIG } from '@/lib/site-config';
import Link from 'next/link'
import MenuItems from '../MenuItems';
import type { MenuItem } from '@/lib/types/menu';

export default function MainSiteHeader({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch, menu }: any & { menu: MenuItem[] }) {
    return (
        <>
            <header>
                <div className={`header-area homepage1 header header-sticky d-none d-lg-block ${scroll ? 'sticky' : ''}`} id="header">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="header-elements">
                                    <div className="site-logo">
                                        <Link href="/"><img src={SITE_CONFIG.logo} alt="" width={100} /></Link>
                                    </div>
                                    <div className="main-menu">
                                        <ul>
                                            <MenuItems items={menu} mode="desktop" />
                                        </ul>
                                    </div>
                                    <div className="btn-area">
                                        <div className="search-icon header__search header-search-btn" onClick={handleSearch}>
                                            <a><img src="/assets/img/icons/search1.svg" alt="" /></a>
                                        </div>
                                        <ul>
                                            {SITE_CONFIG.facebookUrl && (
                                                <li>
                                                    <Link href={SITE_CONFIG.facebookUrl} target='_blank'><i className="fa-brands fa-facebook-f" /></Link>
                                                </li>
                                            )}
                                            {SITE_CONFIG.instagramUrl && (
                                                <li>
                                                    <Link href={SITE_CONFIG.instagramUrl} target='_blank'><i className="fa-brands fa-instagram" /></Link>
                                                </li>
                                            )}
                                            {SITE_CONFIG.linkedinUrl && (
                                                <li>
                                                    <Link href={SITE_CONFIG.linkedinUrl} target='_blank'><i className="fa-brands fa-linkedin-in" /></Link>
                                                </li>
                                            )}
                                            {SITE_CONFIG.pinterestUrl && (
                                                <li>
                                                    <Link href={SITE_CONFIG.pinterestUrl} target='_blank' className="m-0"><i className="fa-brands fa-pinterest-p" /></Link>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    <div className={`header-search-form-wrapper ${isSearch ? 'open' : ''}`}>
                                        <div className="tx-search-close tx-close" onClick={handleSearch}><i className="fa-solid fa-xmark" /></div>
                                        <div className="header-search-container">
                                            <form
                                                role="search"
                                                className="search-form"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    const formData = new FormData(e.currentTarget);
                                                    const query = formData.get('s') as string;
                                                    if (query && query.trim()) {
                                                        window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                                                        handleSearch();
                                                    }
                                                }}
                                            >
                                                <input
                                                    type="search"
                                                    className="search-field"
                                                    placeholder="Search news, events, clubs..."
                                                    name="s"
                                                    required
                                                    minLength={2}
                                                />
                                                <button type="submit" className="search-submit">
                                                    <img src="/assets/img/icons/search1.svg" alt="" />
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    {isSearch && <div className="body-overlay active" onClick={handleSearch} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    )
}


