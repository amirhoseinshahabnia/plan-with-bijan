import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { BUSINESS, legalEffectiveDateLabel } from "@/lib/business-config";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";

export const metadata: Metadata = {
  title: "Privacy Policy | Plan with Bijan",
  description:
    "Privacy Policy for Plan with Bijan, including information collection, SMS messaging compliance, and your rights.",
};

function LegalList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5">
      {items.map((item) => (
        <Text key={item} as="li" variant="body-sm" className="text-gray-600">
          {item}
        </Text>
      ))}
    </ul>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full flex-1">
      <Section
        as="section"
        padding="medium"
        className={cn("bg-white", borderClass("soft", "y"))}
      >
        <Container containerWidth="narrow">
          <Stack spacing={10}>
            <Stack spacing={4} className={cn(borderClass("soft", "b"), "pb-4")}>
              <Heading as="h1" variant="heading-xl" className="text-navy-900">
                {BUSINESS.name}
              </Heading>
              <Text variant="body-sm" className="text-gray-600">
                Effective Date: {legalEffectiveDateLabel()}
              </Text>
              <Stack spacing={3}>
                <Text
                  variant="body-sm"
                  className="uppercase text-navy-900"
                >
                  Important Notice Regarding Text Messaging
                </Text>
                <Text variant="body-sm" className="uppercase text-navy-900">
                  Data
                </Text>
                <Text variant="body-sm" className="text-gray-600">
                  {BUSINESS.name}
                  {" "}
                  (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) DOES
                  NOT share customer opt-in information, including phone numbers
                  and consent records, with any affiliates or third parties for
                  marketing, promotional, or any other purposes unrelated to
                  providing our direct services. All text messaging originator
                  opt-in data is kept strictly confidential.
                </Text>
              </Stack>
            </Stack>

            <Stack spacing={8}>
              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  1. Information We Collect
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  We collect the following types of information:
                </Text>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Personal Information:
                  </Text>
                  <LegalList
                    items={[
                      "Name, email address, phone number, physical address",
                      "Payment information when you make a purchase or request a quote",
                      "Opt-in records and timestamps for all communication channels (SMS, email, etc.)",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Non-Personal Information:
                  </Text>
                  <LegalList
                    items={[
                      "IP address, browser type, device information",
                      "Website usage patterns and analytics",
                      "Cookies and similar technologies",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Customer Communication:
                  </Text>
                  <LegalList
                    items={[
                      "Records of inquiries and service requests",
                      "Appointment details and preferences",
                      "Service history and feedback",
                    ]}
                  />
                </Stack>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  2. How We Use Your Information
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  We use collected data for:
                </Text>
                <LegalList
                  items={[
                    "Providing and improving our services",
                    "Processing transactions and payments",
                    "Communicating with you about your inquiries, appointments, and promotions",
                    "Enhancing website functionality and user experience",
                    "Ensuring security and fraud prevention",
                    "Maintaining records of your communication preferences and consent",
                  ]}
                />
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  3. SMS Messaging & Compliance
                </Heading>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Text Message Program Terms & Conditions
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    By opting into our SMS messaging services, you agree to receive
                    text messages related to our services, including appointment
                    reminders, customer support, and important updates.
                  </Text>
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Opt-In & Consent:
                  </Text>
                  <LegalList
                    items={[
                      "You will only receive messages if you have explicitly opted in",
                      "We maintain timestamped records of all opt-in actions",
                      "We comply with the Telephone Consumer Protection Act (TCPA) and all applicable laws",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Opt-Out Instructions:
                  </Text>
                  <LegalList
                    items={[
                      "You can cancel SMS notifications at any time by replying \"STOP\"",
                      "You will receive a final confirmation message, and no further messages will be sent unless you re-opt in",
                      "All opt-out requests are processed immediately.",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Message Frequency & Content:
                  </Text>
                  <LegalList
                    items={[
                      "Message frequency varies based on your interactions with our business",
                      "Messages will be directly related to the services you have requested",
                      "We do not send promotional content without specific consent",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Help & Support:
                  </Text>
                  <LegalList
                    items={[
                      `Reply "HELP" for assistance or contact us at ${BUSINESS.email}`,
                      "Customer support is available during regular business hours",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Carrier Information:
                  </Text>
                  <LegalList
                    items={[
                      "Standard message and data rates may apply",
                      "Carriers are not liable for delayed or undelivered messages",
                      "Supported carriers include AT&T, Verizon, T-Mobile, Sprint, and most regional carriers",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    SMS Data Protection Statement
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    No mobile information will be shared with third parties/affiliates
                    for marketing/promotional purposes. Information sharing to
                    subcontractors in support services, such as customer service is
                    permitted. All other use case categories exclude text messaging
                    originator opt-in data and consent; this information will not be
                    shared with any third parties.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    We implement strict data protection measures to safeguard your SMS
                    opt-in information and consent records.
                  </Text>
                </Stack>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  4. Information Sharing & Disclosure
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  We do not sell, rent, or trade personal information. We may share
                  information with:
                </Text>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Service Providers:
                  </Text>
                  <LegalList
                    items={[
                      "Third-party vendors who assist in our operations (e.g., payment processing, appointment scheduling)",
                      "SMS aggregators and providers solely for the purpose of delivering messages you've consented to receive",
                      "All service providers are contractually obligated to maintain confidentiality and security",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Legal Compliance:
                  </Text>
                  <LegalList
                    items={[
                      "If required by law, legal process, or to protect our rights",
                      "In response to valid law enforcement requests or court orders",
                    ]}
                  />
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Business Transfers:
                  </Text>
                  <LegalList
                    items={[
                      "In case of mergers, acquisitions, or sale of assets",
                      "In such cases, your data remains protected under the terms of this policy",
                    ]}
                  />
                </Stack>
                <Text variant="body-sm" className="text-gray-600">
                  All the above categories exclude text messaging originator opt-in
                  data and consent; this information will not be shared with any third
                  parties, excluding aggregators and providers of the Text Message
                  services.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  5. Data Security
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  We implement and maintain reasonable security measures to protect
                  your personal information:
                </Text>
                <LegalList
                  items={[
                    "Encryption of sensitive data in transit and at rest",
                    "Secure access controls and authentication mechanisms",
                    "Regular security assessments and updates",
                    "Employee training on data protection",
                    "Breach notification protocols in accordance with applicable laws",
                    "Secure backup systems and disaster recovery procedures",
                  ]}
                />
                <Text variant="body-sm" className="text-gray-600">
                  Despite these measures, no method of transmission over the Internet
                  or electronic storage is 100% secure. We strive to use commercially
                  acceptable means to protect your personal information but cannot
                  guarantee absolute security.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  6. Cookies & Tracking Technologies
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  We use cookies and similar technologies to:
                </Text>
                <LegalList
                  items={[
                    "Analyze site traffic and user behavior",
                    "Remember your preferences",
                    "Improve website functionality and user experience",
                    "Measure the effectiveness of our services",
                  ]}
                />
                <Text variant="body-sm" className="text-gray-600">
                  You may control cookies through your browser settings. Disabling
                  cookies may limit your ability to use certain features of our
                  website.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  7. Your Rights & Choices
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  You have the right to:
                </Text>
                <LegalList
                  items={[
                    "Access, update, or delete your personal information",
                    "Opt-out of marketing emails by clicking \"unsubscribe\" in our emails",
                    "Opt-out of SMS messages by replying \"STOP\"",
                    "Request information on how we process your data",
                    "Withdraw consent at any time for future communications",
                    "Lodge a complaint with a supervisory authority if you believe your rights have been violated",
                  ]}
                />
                <Text variant="body-sm" className="text-gray-600">
                  To exercise these rights, please contact us using the information
                  in Section 10.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  8. Third-Party Links
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  Our website may contain links to third-party websites. We are not
                  responsible for their privacy practices and encourage you to review
                  their policies. This privacy policy applies only to information
                  collected by {BUSINESS.name}.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  9. Changes to This Privacy Policy
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  We may update this policy periodically. The latest version will
                  always be available on our website with the effective date. For
                  significant changes, we will notify you by email or through a notice
                  on our website.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  10. Contact Us
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  If you have questions about this Privacy Policy or how your
                  information is handled, contact us at:
                </Text>
                <Stack spacing={2}>
                  <Text variant="body-sm" className="text-gray-600">
                    {BUSINESS.name}
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    Phone: {BUSINESS.phone}
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    Email: {BUSINESS.email}
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    Website: {BUSINESS.website}
                  </Text>
                </Stack>
                <Text variant="body-sm" className="text-gray-600">
                  By using our website and services, you consent to this Privacy
                  Policy.
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
