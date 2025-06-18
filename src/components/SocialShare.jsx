import { FaTwitter, FaLinkedin } from "react-icons/fa";

export default function SocialShare({ url, title }) {
  const shareUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(title);
  const twitterLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
  const linkedinLink = `https://www.linkedin.com/shareArticle?url=${shareUrl}&title=${shareText}`;

  return (
    <div className="flex gap-4">
      <a
        href={twitterLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <FaTwitter size={20} />
      </a>
      <a
        href={linkedinLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <FaLinkedin size={20} />
      </a>
    </div>
  );
}
