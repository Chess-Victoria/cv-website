'use client'
import { SITE_CONFIG } from '@/lib/site-config';
import Link from 'next/link'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function MainSiteHeader({ scroll, isMobileMenu, handleMobileMenu, isSearch, handleSearch }: any) {
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
                                            <li><Link href="/about">About Chess Victoria<i className="fa-solid fa-angle-down" /></Link>

                                                <ul className="dropdown-padding">
                                                    <li>
                                                        <Link href="/committees">Our Committees</Link>
                                                    </li>
                                                    <li><Link href="/about/players">Our Players</Link></li>
                                                    <li><Link href="/pages/chess-victoria-mission">Our Missions</Link></li>
                                                    <li><Link href="/pages/chess-victoria-vision">Our Vision</Link></li>
                                                    <li><Link href="/memories">Our Memories</Link></li>
                                                </ul>
                                            </li>
                                            
                                            <li>
                                                <Link href="/victorian-champions">Victorian Champions <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href="/victorian-champions/junior-champions">Junor Champions</Link></li>
                                                    <li><Link href="/victorian-champions/australian-master">Australian Masters</Link></li>
                                                    <li><Link href="/victorian-champions/victorian-champions">Victorian Champions</Link></li>
                                                    <li><Link href="/victorian-champions/victorian-country-champions">Victorian Country Champions</Link></li>
                                                    <li><Link href="/victorian-champions/victorian-open-champions">Victorian Open Champions</Link></li>
                                                    <li><Link href="/victorian-champions/victorian-women-champions">Victorian Women Champions</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href="/events">Events <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href="/events/2025-chess-victoria/">Chess Victoria Event</Link></li>
                                                    <li><Link href="/events/2025-state-tournaments">State level Tournaments</Link></li>
                                                    <li><Link href="/events/fide-tournaments">FIDE Tournaments</Link></li>
                                                </ul>
                                            </li>

                                            <li>
                                                <Link href="/chess-clubs">Chess Club in Victoria <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href="/chess-clubs/other-chess-associations">Other Chess Associations</Link></li>
                                                   
                                                </ul>
                                            </li>

                                            <li>
                                                <Link href="/news">News & Update <i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                    <li><Link href="/news/category/chess-victoria-news/page-1">Chess Victoria News</Link></li>
                                                    <li><Link href="/news/category/victorian-junior-updates/page-1">Victorian Junior News</Link></li>
                                                    <li><Link href="/news/category/victorian-championship-news/page-1">Victorian Champions News</Link></li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href="/others">Others<i className="fa-solid fa-angle-down" /></Link>
                                                <ul className="dropdown-padding">
                                                <li><Link href="/documents">Documents</Link></li>
                                                <li><Link href="/galleries">Galleries</Link></li>
                                                    <li><Link href="/faq">FAQ</Link></li>
                                                    <li><Link href="/contact">Contact Us</Link></li>
                                                </ul>
                                            </li>
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


