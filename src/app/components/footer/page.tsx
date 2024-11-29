"use client";
import React, { useState } from 'react';
import styles from '../footer/footer.module.css';
import TelegramIcon from '@mui/icons-material/Telegram';
import XIcon from '@mui/icons-material/X';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const ContentBox = ({ title, content }: { title: string; content: string }) => (
    <div className={styles.contentBox}>
        <h4>{title}</h4>
        <p>{content.slice(0, 100)}...</p>
    </div>
);

const Footer = () => {
    const contentData = [
        { title: "What is GITN?", content: "Getgems is an NFT marketplace built on The Open Network blockchain..." },
        { title: "What is Ton?", content: "TON is a blockchain ecosystem created from the ground up to make digital life easier..." },
        { title: "What is an NFT?", content: "In general, an NFT, or nonfungible token, is a digital contract..." },
        { title: "What is a crypto wallet?", content: "Crypto wallets play the same role as regular wallets where you keep cards and cash..." },
        { title: "How to buy Toncoins?", content: "You can buy Toncoin with a credit or debit card in the Tonkeeper app..." },
        { title: "Any other questions?", content: "How can you buy NFTs on Getgems? How to mint a collection or NFT on Getgems?..." }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNavigation = (direction: 'prev' | 'next') => {
        setCurrentIndex(prev =>
            direction === 'prev' ? Math.max(prev - 1, 0) : Math.min(prev + 1, contentData.length - 5)
        );
    };

    return (
        <div className={styles.mainContent}>
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.logoSection}>
                        <p className={styles.aboutTitle}>About TON & NFT</p>
                        <div className={styles.contentNavigation}>
                            <button
                                onClick={() => handleNavigation('prev')}
                                disabled={currentIndex === 0}
                                className={styles.navigationButton}
                            >
                                <ArrowForwardIosIcon style={{ transform: 'rotate(180deg)' }} />
                            </button>

                            <div className={styles.contentBoxes}>
                                {contentData.slice(currentIndex, currentIndex + 5).map((data, index) => (
                                    <ContentBox key={index} title={data.title} content={data.content} />
                                ))}
                            </div>

                            <button
                                onClick={() => handleNavigation('next')}
                                disabled={currentIndex >= contentData.length - 5} className={styles.navigationButton}
                            >
                                <ArrowForwardIosIcon />
                            </button>
                        </div>
                    </div>

                    <FooterDetails />
                </div>
            </footer>
        </div>
    );
};

const FooterDetails = () => (
    <div className={styles.footerContainer}>
        <div className={styles.footerContent2}>
            <SectionTitle title="GITN" />
            <p>Welcome to the largest NFT marketplace based on The Open Network.</p>
            <p>Make yourself at home among other NFT enthusiasts.</p>
            <p>Explore a wide variety of NFTs, from digital art to tokenized real-world assets.</p>
            <p>Join a vibrant community and stay updated with the latest NFT trends.</p>

            <div className={styles.buttonContainer}>
                {[
                    { icon: <TelegramIcon />, text: "Join our Telegram Channel" },
                    { icon: <XIcon />, text: "Follow us on Twitter" },
                    { icon: <GitHubIcon />, text: "Visit our GitHub" }
                ].map((button, index) => (
                    <button key={index} className={styles.button}>
                        {button.icon} {button.text}
                    </button>
                ))}
            </div>

            <SectionStats />
            <CommunityLinks />
        </div>

        <FooterColumns />
    </div>
);

const SectionTitle = ({ title }: { title: string }) => <p className={styles.aboutTitle}>{title}</p>;

const SectionStats = () => (
    <div className={styles.statsSection}>
        <h4>Platform Stats</h4>
        <ul>
            <li>Over 10,000 NFTs listed</li>
            <li>More than 5,000 active users daily</li>
            <li>Transactions worth over $1M processed</li>
        </ul>
    </div>
);

const CommunityLinks = () => (
    <div className={styles.communityLinks}>
        <h4>Community Links</h4>
        <p>Be part of our growing ecosystem:</p>
        <ul>
            <li><a href="#">Developer Resources</a></li>
            <li><a href="#">Community Forums</a></li>
            <li><a href="#">Events & Webinars</a></li>
        </ul>
    </div>
);

const FooterColumns = () => (
    <div className={styles.footerColumns}>
        {[
            { title: "Marketplace", links: ["Brand", "For NFT Creators"] },
            {
                title: "Support",
                links: ["Terms", "Privacy Policy", "Contacts", "Support Bot"],
                extra: "Email: support@getgems.io"
            }
        ].map((column, index) => (
            <div key={index} className={styles.column}>
                <h4>{column.title}</h4>
                <ul>
                    {column.links.map((link, i) => (
                        <li key={i}><a href="#">{link}</a></li>
                    ))}
                    {column.extra && <li>{column.extra}</li>}
                </ul></div>
        ))}
    </div>
);

export default Footer;