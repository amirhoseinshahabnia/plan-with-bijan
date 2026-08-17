import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { Stack } from "@/components/ui/stack";
import { Text } from "@/components/ui/text";
import { BUSINESS, legalEffectiveDateLabel } from "@/lib/business-config";
import { borderClass } from "@/lib/borders";
import { cn } from "@/lib/util";

export const metadata: Metadata = {
  title: "Terms of Service | Plan with Bijan",
  description:
    "Terms of Service for Plan with Bijan, including SMS messaging terms and general website use.",
};

export default function TermsOfServicePage() {
  return (
    <main className="w-full flex-1">
      <Section
        as="section"
        padding="medium"
        className={cn("bg-white", borderClass("soft", "y"))}
      >
        <Container containerWidth="narrow">
          <Stack spacing={10}>
            <Stack spacing={4}>
              <Heading as="h1" variant="heading-xl" className="text-navy-900">
                {BUSINESS.name}
              </Heading>
              <Text variant="body-sm" className="text-gray-600">
                Effective Date: {legalEffectiveDateLabel()}
              </Text>
            </Stack>

            <Stack spacing={8}>
              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  SMS Messaging Terms & Compliance
                </Heading>
                <Stack spacing={3}>
                  <Text variant="body-sm" className="text-gray-600">
                    <Text
                      as="span"
                      variant="body-sm"
                      className="font-medium text-navy-900"
                    >
                      1. Program Description:{" "}
                    </Text>
                    This messaging program sends appointment confirmation and
                    reminder messages to customers who have booked an appointment
                    with {BUSINESS.name} through our website at {BUSINESS.website},
                    or via our scheduling forms, and have explicitly opted in to
                    receive SMS notifications. Opt-in is collected via web forms
                    with a dedicated checkbox for SMS consent. Messages include
                    scheduling confirmations, appointment reminders, rescheduling
                    updates, and customer support communications.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    <Text
                      as="span"
                      variant="body-sm"
                      className="font-medium text-navy-900"
                    >
                      2. Cancellation Instructions:{" "}
                    </Text>
                    You can cancel the SMS service at any time. Simply text
                    &ldquo;STOP&rdquo; to the same number that sent you messages.
                    Upon sending &ldquo;STOP,&rdquo; we will confirm your
                    unsubscribe status via SMS. Following this confirmation, you will
                    no longer receive SMS messages from us. To rejoin, sign up as
                    you did initially, and we will resume sending SMS messages to
                    you.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    <Text
                      as="span"
                      variant="body-sm"
                      className="font-medium text-navy-900"
                    >
                      3. Support Information:{" "}
                    </Text>
                    If you experience issues with the messaging program, reply with
                    the keyword &ldquo;HELP&rdquo; for more assistance, or reach out
                    directly to {BUSINESS.email} or call {BUSINESS.phone} during
                    business hours.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    <Text
                      as="span"
                      variant="body-sm"
                      className="font-medium text-navy-900"
                    >
                      4. Carrier Liability:{" "}
                    </Text>
                    Carriers are not liable for delayed or undelivered messages.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    <Text
                      as="span"
                      variant="body-sm"
                      className="font-medium text-navy-900"
                    >
                      5. Message & Data Rates:{" "}
                    </Text>
                    Message and data rates may apply for messages sent to you from
                    us and to us from you. Message frequency varies based on your
                    service usage and appointment schedule. For questions about your
                    text plan or data plan, contact your wireless provider.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    <Text
                      as="span"
                      variant="body-sm"
                      className="font-medium text-navy-900"
                    >
                      6. Supported Carriers:{" "}
                    </Text>
                    Our SMS program works with all major U.S. wireless carriers,
                    including AT&T, T-Mobile, Verizon, Sprint, and most regional
                    carriers.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    <Text
                      as="span"
                      variant="body-sm"
                      className="font-medium text-navy-900"
                    >
                      7. Age Restriction:{" "}
                    </Text>
                    You must be 18 years or older to participate in our SMS program.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    <Text
                      as="span"
                      variant="body-sm"
                      className="font-medium text-navy-900"
                    >
                      8. Privacy Policy:{" "}
                    </Text>
                    For privacy-related inquiries, please refer to our Privacy Policy
                    at{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-copper-600 underline underline-offset-2 transition-colors hover:text-copper-500"
                    >
                      {BUSINESS.website}/privacy-policy
                    </Link>
                  </Text>
                </Stack>
                <Text variant="body-sm" className="text-gray-600">
                  We comply with all applicable laws and regulations, including the
                  Telephone Consumer Protection Act (TCPA) and CTIA guidelines,
                  regarding the use of SMS communications.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  General Terms
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  This website (the &ldquo;Site&rdquo;) is owned and operated by{" "}
                  {BUSINESS.name} (&ldquo;COMPANY,&rdquo; &ldquo;we&rdquo; or
                  &ldquo;us&rdquo;). By using the Site, you agree to be bound by
                  these Terms of Service and to use the Site in accordance with
                  these Terms of Service, our Privacy Policy, and any additional
                  terms and conditions that may apply to specific sections of the
                  Site or to products and services available through the Site or
                  from {BUSINESS.name}.
                </Text>
                <Text variant="body-sm" className="text-gray-600">
                  Accessing the Site, in any manner, whether automated or otherwise,
                  constitutes use of the Site and your agreement to be bound by
                  these Terms of Service.
                </Text>
                <Text variant="body-sm" className="text-gray-600">
                  We reserve the right to change these Terms of Service or to impose
                  new conditions on the use of the Site from time to time, in which
                  case we will post the revised Terms of Service on this website. By
                  continuing to use the Site after we post any such changes, you
                  accept the Terms of Service, as modified.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  Intellectual Property Rights
                </Heading>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Our Limited License to You
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    This Site and all the materials available on the Site are the
                    property of {BUSINESS.name} and/or our affiliates or licensors
                    and are protected by copyright, trademark, and other intellectual
                    property laws. The Site is provided solely for your personal
                    non-commercial use.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    You may not use the Site or the materials available on the Site
                    in a manner that constitutes an infringement of our rights or
                    that has not been authorized by us.
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    Unless explicitly authorized, you may not modify, copy,
                    reproduce, republish, upload, post, transmit, translate, sell,
                    create derivative works, exploit, or distribute in any manner or
                    medium any material from the Site. However, you may download
                    and/or print one copy of individual pages for your personal,
                    non-commercial use, provided that you keep intact all copyright
                    and other proprietary notices.
                  </Text>
                </Stack>
                <Stack spacing={3}>
                  <Text
                    variant="body-sm"
                    className="font-medium text-navy-900"
                  >
                    Your License to Us
                  </Text>
                  <Text variant="body-sm" className="text-gray-600">
                    By posting or submitting any material (including comments, blog
                    entries, social media posts, photos, and videos) to us via the
                    Site, internet groups, or other digital venues, you represent
                    that you own the material or have obtained the necessary
                    permissions. You grant us a royalty-free, perpetual,
                    irrevocable, non-exclusive, worldwide license to use, modify,
                    transmit, sell, exploit, create derivative works from,
                    distribute, and publicly perform or display such material.
                  </Text>
                </Stack>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  Disclaimers
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  Throughout the Site, we may provide links and pointers to Internet
                  sites maintained by third parties. Our linking to such third-party
                  sites does not imply an endorsement or sponsorship of such sites or
                  the information, products, or services offered on or through the
                  sites.
                </Text>
                <Text variant="body-sm" className="text-gray-600">
                  The information, products, and services offered on or through the
                  Site are provided &ldquo;as is&rdquo; and without warranties of any
                  kind, either express or implied. To the fullest extent permissible
                  pursuant to applicable law, we disclaim all warranties, including
                  implied warranties of merchantability and fitness for a particular
                  purpose.
                </Text>
                <Text variant="body-sm" className="text-gray-600">
                  You agree at all times to indemnify and hold harmless{" "}
                  {BUSINESS.name}, its affiliates, and their respective officers,
                  directors, agents, and employees from any claims, causes of
                  action, damages, liabilities, costs, and expenses arising out of or
                  related to your breach of any obligation, warranty, or
                  representation under these Terms of Service.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  Online Commerce
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  Certain sections of the Site may allow you to purchase products
                  and services from third-party vendors. We are not responsible for
                  the quality, accuracy, timeliness, reliability, or any other
                  aspect of these products and services. If you make a purchase from
                  a third party linked through the Site, the information obtained
                  during your visit, including payment information, may be collected
                  by both the merchant and us.
                </Text>
                <Text variant="body-sm" className="text-gray-600">
                  Your participation in any dealings with third-party vendors is
                  solely between you and the third party. {BUSINESS.name} shall not
                  be responsible for any loss or damage incurred as a result of such
                  dealings.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  Registration & Passwords
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  To access certain features of the Site, you may be required to
                  register and create an account. You agree to provide accurate,
                  current, and complete information during the registration process.
                  You are responsible for maintaining the confidentiality of your
                  login credentials and for all activities conducted under your
                  account.
                </Text>
                <Text variant="body-sm" className="text-gray-600">
                  If you suspect unauthorized use of your account, notify us
                  immediately at {BUSINESS.email}. We are not liable for any loss or
                  damage arising from your failure to comply with this obligation.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  Termination
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  We reserve the right to terminate or suspend your access to the
                  Site, without notice, if we determine that you have violated these
                  Terms of Service or engaged in conduct that we deem inappropriate
                  or unlawful. Upon termination, you must cease all use of the Site
                  and any content obtained from it.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  Governing Law
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  These Terms of Service shall be governed by and construed in
                  accordance with the laws of the state in which {BUSINESS.name}{" "}
                  operates. Any dispute arising under these Terms shall be resolved
                  exclusively through binding arbitration in that jurisdiction.
                </Text>
              </Stack>

              <Stack spacing={4}>
                <Heading
                  as="h2"
                  variant="heading-sm"
                  className="text-navy-900"
                >
                  Changes to Terms of Service
                </Heading>
                <Text variant="body-sm" className="text-gray-600">
                  We may update these Terms of Service from time to time. The latest
                  version will always be available on our website with the effective
                  date.
                </Text>
                <Text variant="body-sm" className="text-gray-600">
                  For any questions regarding these Terms of Service, please contact
                  us at:
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
                  By using our website and services, you consent to these Terms of
                  Service.
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Section>
    </main>
  );
}
