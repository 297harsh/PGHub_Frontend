import React from "react";
import { Box, Typography, Link } from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "95%" },
        margin: "30px auto",
        backgroundColor: "#fff",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "15px",
        padding: { xs: "15px", sm: "25px" },
        color: "#333",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "28px", sm: "35px" },
          fontFamily: '"Roboto", sans-serif',
          textAlign: "center",
          color: "#3f51b5",
          marginBottom: "25px",
        }}
      >
        Privacy Policy
      </Typography>

      <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "20px", color: "#555" }}>
        <strong>Welcome to PGHub!</strong> This Privacy Policy explains how we collect, use,
        disclose, and protect your personal information when you visit our website and use
        our services. By accessing or using PGHub, you agree to the practices described in
        this policy. If you do not agree with our privacy practices, please do not use our
        website or services.
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "15px", color: "#378386" }}>
        1. Collection of Personal Information
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "15px", lineHeight: 1.7 }}>
        <strong>1.1 Types of Information We Collect</strong>
        <br />
        We collect personal information that may include:
        <br />- <strong>Contact Information:</strong> Name, address, email address, phone number.
        <br />- <strong>Account Details:</strong> Username, password, and preferences.
        <br />- <strong>Identification Information:</strong> ID proofs (e.g., PAN, Passport), bank
        account/credit card details.
        <br />- <strong>Verification Information:</strong> Proof of employment, educational background.
        <br />- <strong>User Contributions:</strong> Information posted on your profile, feedback, comments, and
        discussions on our website.
        <br />- <strong>Social Networking Information:</strong> Data from social media accounts if you log in
        through such accounts.
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
        <strong>1.2 How We Collect Information</strong>
        <br />- <strong>Directly from You:</strong> When you register, create a profile, or interact with our website.
        <br />- <strong>From Social Networking Sites:</strong> If you log in using social media accounts, we collect basic
        profile information as permitted.
        <br />- <strong>Automatically:</strong> Through cookies, web beacons, and tracking technologies as you use our website.
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "15px", color: "#378386" }}>
        2. Use of Personal Information
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
        We use your personal information to:
        <br />- <strong>Provide Services:</strong> Manage and operate your account, process payments, and offer customer support.
        <br />- <strong>Improve User Experience:</strong> Analyze usage patterns to enhance our website and services.
        <br />- <strong>Communicate:</strong> Send you updates, notifications, and promotional materials.
        <br />- <strong>Verify Identity:</strong> Confirm the authenticity of information and prevent fraud.
        <br />- <strong>Legal Compliance:</strong> Comply with applicable laws and regulations, and protect our rights.
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "15px", color: "#378386" }}>
        3. Sharing of Personal Information
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
        We may share your personal information with:
        <br />- <strong>Service Providers:</strong> Third-party vendors that assist us in operating our website and services.
        <br />- <strong>Social Networking Sites:</strong> If you log in through social media accounts, information may be shared with
        those platforms.
        <br />- <strong>Legal Authorities:</strong> When required to comply with legal obligations, enforce our policies, or protect our rights
        and the rights of others.
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "15px", color: "#378386" }}>
        4. Cookies and Tracking Technologies
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
        We use cookies, web beacons, and other tracking technologies to collect data on your interactions with our website. This helps us:
        <br />- <strong>Analyze Usage:</strong> Understand how our website is used and improve its functionality.
        <br />- <strong>Target Advertising:</strong> Provide relevant ads based on your interests.
        <br />- <strong>Prevent Fraud:</strong> Enhance security and prevent fraudulent activities.
        <br />
        You can manage cookie preferences through your browser settings, but disabling cookies may affect the functionality of our website.
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "15px", color: "#378386" }}>
        5. Data Security
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
        We implement reasonable security measures to protect your personal information from unauthorized access, disclosure, or misuse.
        However, no data transmission over the internet or electronic storage is completely secure. While we strive to protect your
        information, we cannot guarantee its absolute security.
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "15px", color: "#378386" }}>
        6. Your Rights and Choices
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
        You have the right to:
        <br />- <strong>Access:</strong> Request a copy of the personal information we hold about you.
        <br />- <strong>Correction:</strong> Request corrections to any inaccurate or incomplete information.
        <br />- <strong>Deletion:</strong> Request the deletion of your personal information, subject to legal and contractual obligations.
        <br />- <strong>Opt-Out:</strong> Unsubscribe from marketing communications and adjust your cookie preferences.
        <br />
        To exercise these rights, please contact us using the details provided below.
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "15px", color: "#378386" }}>
        7. Changes to This Privacy Policy
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
        We may update this Privacy Policy from time to time. Any changes will be posted on our website with the effective date.
        Your continued use of our website and services after any modifications indicates your acceptance of the updated policy.
      </Typography>

      <Typography variant="h5" sx={{ marginBottom: "15px", color: "#378386" }}>
        8. Contact Us
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px", lineHeight: 1.7 }}>
        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        <br />
        <strong>Email:</strong>{" "}
        <Link href="mailto:support@pghub.com" color="primary" underline="hover">
          support@pghub.com
        </Link>
      </Typography>
    </Box>
  );
};

export default PrivacyPolicy;
