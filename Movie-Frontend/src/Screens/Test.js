import { FaWhatsapp } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

export default function Test() {
  const shareUrl = "https://your-website.com/shareable-content";
  const shareTitle = "Share this awesome content!";

  return (
    <div className="share-buttons">
      <FacebookShareButton
        url={shareUrl}
        quote={shareTitle}
        className="share-button"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareUrl}
        title={shareTitle} // Optional title for Twitter
        className="share-button"
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton
        url={shareUrl}
        title={shareTitle} // Optional title for WhatsApp
        className="share-button"
      >
        <FaWhatsapp size={32} round />
      </WhatsappShareButton>
    </div>
  );
}
