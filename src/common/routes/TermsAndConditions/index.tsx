import React from "react";
import "./style.css"; // Add custom CSS for styling
import { Helmet } from "react-helmet";
import Header from "src/common/components/Header";
import Footer from "src/common/components/Footer";

const TermsAndConditions = () => {
  return (
    <>
      <Helmet>
        <title>Terms Of Use - Tagzy</title>
        <meta
          name="description"
          content="Read TagZy's privacy terms of use to understand how we collect, use, and protect your personal information when you use our local services marketplace."
        />
        <meta
          name="keywords"
          content="Terms of use, TagZy, data protection, user privacy, local services marketplace"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tagzy.in/privacyPolicy" />
        <meta property="og:title" content="Terms of use - TagZy" />
        <meta
          property="og:description"
          content="Learn about TagZy's commitment to protecting your privacy and personal information."
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://www.tagzy.in/privacyPolicy" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="TagZy" />
      </Helmet>
      <Header />
      <div className="privacy-container">
        <div className="privacy-content">
          <div className="logo-container">
            <img src="/logo.png" alt="TagZy Logo" className="logo" />
          </div>
          <h1>
            {" "}
            <span style={{ fontFamily: "serif" }}>TagZy Terms of use</span>
          </h1>
          <p>
            <span style={{ fontFamily: "serif" }}>Introduction : </span> Kindly
            go through the 'Terms of Use' below. The mentioned points will give
            you a basic idea of terms and conditions existing in the company.{" "}
            <span style={{ fontFamily: "serif" }}>TagZy</span> offers its
            services (collectively referred to as "Media").
          </p>
          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              I. YOUR ACCEPTANCE OF THIS AGREEMENT
            </span>
          </h3>
          <p>
            This is an agreement between you ("you" or "your") and TagZy
            ("TagZy," "we," or "our") that governs your use of the search
            services offered by Tagzy through its website  <a style={{textDecoration: 'underline'}} href="https://tagzy.in/" target="_blank" rel="noreferrer">www.tagzy.in</a>  ("Website") and app For Android User - <a style={{textDecoration: 'underline'}} href="https://play.google.com/store/apps/details?id=com.tagzy.hire_pro&pli=1" target="_blank" rel="noreferrer">https://dub.sh/android_TagZy</a> , For iOS User - <a style={{textDecoration: 'underline'}} href="https://apps.apple.com/in/app/tagzy/id6737283128" target="_blank" rel="noreferrer">https://dub.sh/iOS_TagZy</a> , using which TagZy may provide the search services ("Platform"). When you access or use the Platform,
            you agree to be bound by these Terms and Conditions ("Terms").
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>II. CHANGES</span>
          </h3>
          <p>
            We may periodically change the Terms and the Site without notice,
            and you are responsible for checking these Terms periodically for
            revisions. All amended Terms become effective upon our posting to
            the Site, and any use of the site after such revisions have been
            posted signifies your consent to the changes.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              III. HOW YOU MAY USE OUR MATERIALS
            </span>
          </h3>
          <p>
            We use a diverse range of information, text, photographs, designs,
            graphics, images, sound and video recordings, animation, content,
            advertisement and other materials and effects (collectively
            "Materials") for the search services on the Platform. We provide the
            Materials through the Platform FOR YOUR PERSONAL AND NON-COMMERCIAL
            USE ONLY. While every attempt has been made to ascertain the
            authenticity of the Platform content, TagZy is not liable for any
            kind of damages, losses or action arising directly or indirectly,
            due to access and/or use of the content in the Platform including
            but not limited to decisions based on the content in the Platform
            which results in any loss of revenue, profits, property etc.
            Accordingly, you may view, use, copy, and distribute the Materials
            found on the Platform for internal, non-commercial, informational
            purposes only. You are prohibited from data mining, scraping,
            crawling, or using any process or processes that send automated
            queries to TagZy. You may not use the Platform or any of them to
            compile a collection of listings, including a competing listing
            product or service. You may not use the platform or any Materials
            for any unsolicited commercial e-mail. Except as authorized in this
            paragraph, you are not being granted a license under any copyright,
            trademark, patent or other intellectual property right in the
            Materials or the products, services, processes or technology
            described therein. All such rights are retained by TagZy, its
            subsidiaries, parent companies, and/or any third party owner of such
            rights.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              IV. HOW YOU MAY USE OUR MARKS
            </span>
          </h3>
          <p>
            The Tagzy company names and logos and all related products and
            service names, design marks, and slogans are trademarks and service
            marks owned by and used under license from Tagzy or its wholly-owned
            subsidiaries. All other trademarks and service marks herein are the
            property of their respective owners. All copies that you make of the
            Materials on the Platform must bear any copyright, trademark, or
            other proprietary notice located on the respective Platform that
            pertains to the material being copied. You are not authorized to use
            any Tagzy name or mark in any advertising, publicity, or in any
            other commercial manner without the prior written consent of Tagzy.
            Requests for authorization should be made to  <a style={{textDecoration: 'underline'}} href="mailto:info@tagzy.in">info@tagzy.in</a> .
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              V. HOW WE MAY USE INFORMATION YOU PROVIDE TO US
            </span>
          </h3>
          <p>
            Do not send us any confidential or proprietary information. Except
            for any personally identifiable information that we agree to keep
            confidential as provided in our Privacy Policy, any material,
            including, but not limited to any feedback, data, answers,
            questions, comments, suggestions, ideas or the like, which you send
            us will be treated as being non-confidential and nonproprietary. We
            assume no obligation to protect confidential or proprietary
            information (other than personally identifiable information) from
            disclosure and will be free to reproduce, use, and distribute the
            information to others without restriction. We will also be free to
            use any ideas, concepts, know-how or techniques contained in
            information that you send us for any purpose whatsoever including
            but not limited to developing, manufacturing and marketing products
            and services incorporating such information.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              VI. REVIEWS, RATINGS & COMMENTS BY USERS
            </span>
          </h3>
          <p>
            Since, Tagzy provides information directory services website, your ("Users") use any of the aforementioned medium to post reviews, ratings and comments about the Tagzy services and also about the advertiser's listed at Tagzy is subject to additional terms and conditions as mentioned herein. You are solely responsible for the content of any transmissions you make to the site and any material you add to the site, including but not limited to transmissions like your reviews, ratings & comments posted by you(the "Communications"). Tagzy does not endorse or accept any of your communication as representative of their (Tagzy) views. By transmitting any public communication to the site, you grant Tagzy an irrevocable, non-exclusive, worldwide, perpetual, unrestricted, royalty-free license (with the right to sublicense) to use, reproduce, distribute, publicly display, publicly perform, adapt, modify, edit, createImageMedia derivative works from, incorporate into one or more compilations and reproduce and distribute such compilations, and otherwise exploit such communications, in the platform. You confirm and warrant that you have the right to grant these rights to Tagzy. You hereby waive and grant to Tagzy all rights including intellectual property rights and also "moral rights" in your communications, posted at Tagzy is free to use all your communications as per its requirements from time to time. You represent and warrant that you own or otherwise control all of the rights to the content that you post as review, rating or comments; that the content is accurate; that use of the content you supply does not violate these terms and will not cause injury to any person or entity. For removal of doubts it is clarified that, the reference to communications would also mean to include the reviews, ratings and comments posted by your Friends tagged by you. Also Tagzy reserves the right to mask or unmask your identity in respect of your reviews, ratings & comments posted by you. Tagzy has the right, but not the obligation to monitor and edit or remove any content posted by you as review, rating or comments. Tagzy cannot review all communications made on its website. However, Tagzy reserves the right, but has no obligation, to monitor and edit, modify or delete any communications (or portions thereof) which Tagzy in its sole discretion deems inappropriate, offensive or contrary to any Tagzy policy, or that violate this terms:
            TagZy reserves the right not to upload or distribute to, or otherwise publish through the site any communication which
            
            <br />
            <br />
            <strong>1.</strong> Is obscene, indecent, pornographic, profane,    sexually explicit, threatening, or abusive.

            <br />
            <strong>2.</strong> Constitutes or contains false or misleading indications of origin or statements of fact.

            <br />
            <strong>3.</strong> Slanders, libels, defames, disparages, or otherwise violates the legal rights of any third party.
            
            <br />
            <strong>4.</strong> Causes injury of any kind to any person or entity.
            
            <br />
            <strong>5.</strong> Infringes or violates the intellectual property rights (including copyright, patent and trademark rights), contract rights, trade secrets, privacy or publicity rights or any other rights of any third party.

            <br />
            <strong>6.</strong> Violates any applicable laws, rules, or regulations.

            <br />
            <strong>7.</strong> Contains software viruses or any other malicious code designed to interrupt, destroy or limit the functionality of any computer software or hardware or telecommunications equipment.

            <br />
            <strong>8.</strong> Impersonates another person or entity, or that collects or uses any information about site visitors.
            <br />
            <br />

            It is also clarified that, if there are any issues or claims due to your posts by way of reviews, ratings and comments, then Tagzy reserves the right to take appropriate legal action against you. Further, you shall indemnify and protect Tagzy against such claims or damages or any issues, due to your posting of such reviews, ratings and comments Tagzy takes no responsibility and assumes no liability for any content posted by you or any third party on Tagzy site or on any mediums of Tagzy. You further acknowledge that conduct prohibited in connection with your use of the Tagzy website includes, but is not limited to, breaching or attempting to breach the security of the site.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              VII. CONTENT DISCLAIMER
            </span>
          </h3>
            <p>
              Tagzy communicates information provided and created by advertisers, homeowners, home improvement professionals and other third parties. While every attempt has been made to ascertain the authenticity of the content on the Platform Tagzy has no control over content, the accuracy of such content, integrity or quality of such content and the information on our pages, and material on the Platform may include technical inaccuracies or typographical errors, and we make no guarantees, nor can we be responsible for any such information, including its authenticity, currency, content, quality, copyright compliance or legality, or any other intellectual property rights compliance, or any resulting loss or damage. Further, we are not liable for any kind of damages, losses or action arising directly or indirectly due to any content, including any errors or omissions in any content, access and/or use of the content on the Platform or any of them including but not limited to content based decisions resulting in loss of revenue, profits, property etc. All of the data on products and promotions including but not limited to, the prices and the availability of any product or service is subject to change without notice by the party providing the product or promotion. You should use discretion while using the Platform.Tagzy reserves the right, in its sole discretion and without any obligation, to make improvements to, or correct any error or omissions in, any portion of the Platform. Where appropriate, we will endeavor to update information listed on the Website on a timely basis, but shall not be liable for any inaccuracies. All rights, title and interest including trademarks and copyrights in respect of the domain name and Platform content hosted on the Platform are reserved with Tagzy. Users are permitted to read, print or download text, data and/or graphics from the Website or any other Platform for their personal use only. Unauthorized access, reproduction, redistribution, transmission and/or dealing with any information contained in the Platform in any other manner, either in whole or in part, are strictly prohibited, failing which strict legal action will be initiated against such users. Links to external internet sites may be provided within the content on Website as a convenience to users. The listing of an external site does not imply endorsement of the site by Tagzy or its affiliates. Tagzy does not make any representations regarding the availability and performance of its platform or any of the external websites to which we provide links. When you click advertiser banners, sponsor links, or other external links from the Website, your browser automatically may direct you to a new browser window that is not hosted or controlled by Tagzy.
              Tagzy and its affiliates are not responsible for the content, functionality, authenticity or technological safety of these external sites. We reserve the right to disable links to or from third-party sites to our website, although we are under no obligation to do so. This right to disable links includes links to or from advertisers, sponsors, and home service providers that may use our Marks as part of a co-branding relationship. Some external links may produce information that some people find objectionable, inappropriate, or offensive. We are not responsible for the accuracy, relevancy, copyright compliance, legality, or decency of material contained in any externally linked websites. We do not fully screen or investigate business listing websites before or after including them in directory listings that become part of the Materials on our platform, and we make no representation and assume no responsibility concerning the content that third parties submit to become listed in any of these directories. All those sections in the platform that invite reader participation will contain views, opinion, suggestion, comments and other information provided by the general public, and Tagzy will at no point of time be responsible for the accuracy or correctness of such information. Tagzy reserves the absolute right to accept/reject information from readers and/or advertisements from advertisers and impose/relax platform access rules and regulations for any users. Tagzy also reserves the right to impose/change the access regulations of the platform , whether in terms of access fee, timings, equipment, access restrictions or otherwise, which shall be posted from time to time under these terms and conditions. It is the responsibility of users to refer to these terms and conditions each time they use the platform. While every attempt has been made to ascertain the authenticity of the content in the platform, Tagzy is not liable for any kind of damages, losses or action arising directly or indirectly, due to access and/or use of the content in the platform including but not limited to any decisions based on content in the platform resulting in loss of revenue, profits, property etc.
            </p>

            <h3>
            {" "}
              <span style={{ fontFamily: "serif" }}>
                IIX. WARRANTY DISCLAIMER
              </span>
            </h3>
            <p>
              Please remember that any provider of goods or services is entitled to register with Tagzy. Tagzy does not examine whether the advertisers are good, reputable or quality sellers of goods/service providers. You must satisfy yourself about all relevant aspects prior to availing of the terms of service. Tagzy has also not negotiated or discussed any terms of engagement with any of the advertisers. The same should be done by you. Purchasing of goods or availing of services from advertisers shall be at your own risk. We do not investigate, represent or endorse the accuracy, legality, legitimacy, validity or reliability of any products, services, other promotions or materials, including advice, ratings, and recommendations contained on, distributed through, or linked, downloaded or accessed from the platform. References that we make to any names, marks, products or services of third parties or hypertext links to third party sites or information do not constitute or imply our endorsement, sponsorship or recommendation of the third party, of the quality of any product or service, advice, information or other materials displayed, purchased, or obtained by you as a result of an advertisement or any other information or offer in or in connection with the platform. Any use of the platform, reliance upon any materials, and any use of the internet generally shall be at your sole risk. Tagzy disclaims any and all responsibility or liability for the accuracy, content, completeness, legality, reliability, or operability or availability of information or material displayed in the search results in the platform.
              
              <br />
              <br />
              THE MATERIAL AND THE PLATFORMS USED TO PROVIDE THE MATERIAL (INCLUDING THE WEBSITE ) ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. Tagzy DISCLAIMS, TO THE FULLEST EXTENT PERMITTED UNDER LAW, ANY WARRANTIES REGARDING THE SECURITY, RELIABILITY, TIMELINESS, ACCURACY AND PERFORMANCE OF THE PLATFORMS AND MATERIALS. Tagzy DOES NOT WARRANT THAT ANY DEFECTS OR ERRORS WILL BE CORRECTED; OR THAT THE CONTENT IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.Tagzy DISCLAIMS ANY AND ALL WARRANTIES TO THE FULLEST EXTENT OF THE LAW, INCLUDING ANY WARRANTIES FOR ANY INFORMATION, GOODS, OR SERVICES, OBTAINED THROUGH, ADVERTISED OR RECEIVED THROUGH ANY LINKS PROVIDED BY OR THROUGH THE PLATFORM SOME COUNTRIES OR OTHER JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU. YOU MAY ALSO HAVE OTHER RIGHTS THAT VARY FROM COUNTRY TO COUNTRY AND JURISDICTION TO JURISDICTION.
            </p>

            <h3>
              {" "}
              <span style={{ fontFamily: "serif" }}>
                IX. USING TAGZY LOCAL SERVICE NEED FULFILLMENT
              </span>
            </h3>
            <p>
              Users of this service are responsible for all aspects of the transactions in which they choose to participate. Users of this service should be aware that:
              
              <br />
              <br />
              <strong>1.</strong> Service providers and users are completely responsible for working out the exchange and performance of services. Tagzy is not responsible for any non-performance or breach of any contract entered into between the users and service providers. Tagzy cannot and does not guarantee that the concerned service provider will perform any transaction concluded on this platform.
              
              <br />
              <strong>2.</strong> Both user and service provider do hereby agree that Tagzy shall not be required to mediate or resolve any dispute or disagreement that might arise between the parties out of these transactions.

              <br />
              <strong>3.</strong> Service providers and users are responsible for researching and complying with any applicable laws, regulations or restrictions on items, services, or manner of sale or exchange that may pertain to transactions in which they participate.
              
              <br />
              <strong>4.</strong> Service providers and users are responsible for all applicable taxes and for all costs incurred by participating in the local service need fulfilment platform.
              
              <br />
              <strong>5.</strong> Tagzy will not be liable for damages of any kind incurred to any parties as a result of the information contained on this platform. Users shall not use or manipulate this service for any fraudulent activity or purpose. Items or services offered for sale must comply with applicable laws. Tagzy disclaims any and / or all responsibility and / or liability for any harm resulting from your use of third party services, and you hereby irrevocably waive any claim against Tagzy with respect to the content or operation of any third party services.
              
              <br />
              <strong>6.</strong> Using our services does not give you ownership of any intellectual property rights in our services or the content you access. These terms do not grant you the right to use any branding or logos used in our services.
              
              <br />
              <strong>7.</strong> You agree to comply with the terms of use and acknowledge that Tagzy reserves the right to terminate your account or take such other action ( including legal remedies) as deemed fit if you commit breach of any terms of use.
              
              <br />
              <strong>8.</strong> User agrees that he / she / they, indemnify Tagzy, its employees, officers, agents and directors from claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, suspected and unsuspected, disclosed and undisclosed, arising out of or in any way connected with transactions or disputes.
              
              <br />
              <strong>9.</strong> We do not control the information provided by other users that is made available through our system. Users may find other user's information to be offensive, harmful, inaccurate, or deceptive. Please use caution and common sense for your own safety. Please note that there are also risks of dealing with underage persons or people acting under false pretence. Additionally, there may also be risks dealing with international trade and foreign nationals.
              
              <br />
              <strong>10.</strong> It is confirmed and acknowledged by the user that, all/any information provided by the user, including name, age, contact details and other details to this platform are accurate and can be used and forwarded by this platform to service providers. Any such act, committed by Tagzy shall not constitute a violation of privacy or other rights of the user.
              
              <br />
              <strong>11.</strong> This platform is not liable for any transactions between the user and service provider. Tagzy holds no responsibility for unsatisfactory or delayed services, nor for any damages incurred during service.
              
              <br />
              <strong>12.</strong> Tagzy does not make any kind of warranties or representation on delivery, service, quality, suitability and availability of services on this platform.
              
              <br />
              <strong>13.</strong> Tagzy shall not be responsible for any loss or damage whatsoever that may be suffered or any personal injury that may be suffered to a user, directly or indirectly by use or non-use of services mentioned on this platform.
              
              <br />
              <strong>14.</strong> Prices mentioned (if any) on this platform are subject to change. Users are advised to check with the service provider for the final price and additional charges applicable, if any. Users do hereby agree to absolve Tagzy from all/any dispute in relation to price of services.
              
              <br />
              <strong>15.</strong> You hereby approve and / or authorise Tagzy to take such measures as are necessary for security purposes and / or improving the quality of services and / or to enhance and provide better service provider services to the satisfaction of the user. The user hereby disclaims his right to prevent and/ or proceed against Tagzy in relation to the same.
            </p>

            <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              X. CODE OF CONDUCT FOR SERVICE PROVIDERS / USERS
            </span>
          </h3>
          <p>
            Users and service providers would be required to resolve any conflict arising from any service provided and Tagzy is not liable for any damages incase:
            
            <br />
            <br />
            <strong>1.</strong> Users have cancelled the booking with Tagzy platform and end up taking the service from the Tagzy listed service provided from outside the platform.
            
            <br />
            <strong>2.</strong> The service provider would be terminated from the platform if providing service to Users after cancelling booking on Tagzy platform.

          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              XI. ADDITIONAL DISCLAIMER
            </span>
          </h3>
          <p>
            Users using any of Tagzy service across the following mediums ie, through internet ie  <a style={{textDecoration: 'underline'}} href="https://tagzy.in/" target="_blank" rel="noreferrer">www.tagzy.in</a>  website is bound by this additional disclaimer wherein they are cautioned to make proper enquiry before they (Users) rely, act upon or enter into any transaction (any kind or any sort of transaction including but not limited to monetary transaction) with the advertiser listed with Tagzy. All the users are cautioned that all and any information of whatsoever nature provided or received from the advertiser/s is taken in good faith, without least suspecting the bonafides of the advertiser/s and Tagzy does not confirm, does not acknowledge, or subscribe to the claims and representation made by the advertiser/s listed with Tagzy .Further, Tagzy is not at all responsible for any act of advertiser/s listed at Tagzy.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              XII. LIMITATION OF LIABILITY
            </span>
          </h3>
          <p>
            IN NO EVENT SHALL Tagzy BE LIABLE TO ANY USER ON ACCOUNT OF SUCH USER'S USE, MISUSE OR RELIANCE ON THE PLATFORMS FOR ANY DAMAGES WHATSOEVER, INCLUDING DIRECT, SPECIAL, PUNITIVE, INDIRECT, CONSEQUENTIAL OR INCIDENTAL DAMAGES OR DAMAGES FOR LOSS OF PROFITS, REVENUE, USE, OR DATA WHETHER BROUGHT IN WARRANTY, CONTRACT, INTELLECTUAL PROPERTY INFRINGEMENT, TORT (INCLUDING NEGLIGENCE) OR OTHER THEORY, EVEN IF Tagzy IS AWARE OF OR HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE, ARISING OUT OF OR CONNECTED WITH THE USE (OR INABILITY TO USE) OR PERFORMANCE OF THE PLATFORM, THE MATERIALS OR THE INTERNET GENERALLY, OR THE USE (OR INABILITY TO USE), RELIANCE UPON OR PERFORMANCE OF ANY MATERIAL CONTAINED IN OR ACCESSED FROM ANY PLATFORMS. Tagzy DOES NOT ASSUME ANY LEGAL LIABILITY OR RESPONSIBILITY FOR THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY INFORMATION, APPARATUS, PRODUCT OR PROCESS DISCLOSED ON THE PLATFORMS OR OTHER MATERIAL ACCESSIBLE FROM THE PLATFORM. THE USER OF THE PLATFORM ASSUMES ALL RESPONSIBILITY AND RISK FOR THE USE OF THIS PLATFORM AND THE INTERNET GENERALLY. THE FOREGOING LIMITATIONS SHALL APPLY NOTWITHSTANDING ANY FAILURE OF THE ESSENTIAL PURPOSE OF ANY LIMITED REMEDY AND TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW. SOME COUNTRIES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF LIABILITY OF CONSEQUENTIAL OR INCIDENTAL DAMAGES, SO THE ABOVE EXCLUSIONS MAY NOT APPLY TO ALL USERS; IN SUCH COUNTRIES LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED BY LAW.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              XIII. THIRD PARTY SITES
            </span>
          </h3>
          <p>
            Your correspondence or business dealing with or participation in the sales promotions of advertisers or service providers found on or through the Platform, including payment and delivery of related goods or services, and any other terms, conditions, and warranties or representations associated with such dealings, are solely between you and such advertisers or service providers. You assume all risks arising out of or resulting from your transaction of business over the internet, and you agree that we are not responsible or liable for any loss or result of the presence of information about or links to such advertisers or service providers on the platform. You acknowledge and agree that we are not responsible or liable for the availability, accuracy, authenticity, copyright compliance, legality, decency or any other aspect of the content, advertising, products, services, or other materials on or available from such sites or resources. You acknowledge and agree that your use of these linked sites is subject to different terms of use than these terms, and may be subject to different privacy practices than those set forth in the Privacy Policy governing the use of the platform. We do not assume any responsibility for review or enforcement of any local licensing requirements that may be applicable to businesses listed on the platform.

            <br />
            <br />
            <strong>MONITORING OF MATERIALS TRANSMITTED BY YOU</strong>: Changes may be periodically incorporated into the platform. Tagzy may make improvements and/or changes in the products, services and/or programs described in the platform and the material at any time without notice. We are under no obligation to monitor the material residing on or transmitted to the platform. However, anyone using the platform agrees that Tagzy may monitor the platform contents periodically to (1) comply with any necessary laws, regulations or other governmental requests; (2) to operate the platform properly or to protect itself and its users. Tagzy reserves the right to modify, reject or eliminate any material residing on or transmitted to its platform that it, in its sole discretion, believes is unacceptable or in violation of the law or these terms and conditions.

            <br />
            <strong>DELETIONS FROM SERVICE</strong>: Tagzy will delete any materials at the request of the user who submitted the materials or at the request of an advertiser who has decided to "opt-out" of the addition of materials to its advertising, including, but not limited to ratings and reviews provided by third parties. Tagzy reserves the right to delete (or to refuse to post to public forums) any materials it deems detrimental to the system or is, or in the opinion of Tagzy, may be, defamatory, infringing or violate of applicable law. Tagzy reserves the right to exclude Material from the platform. material submitted to Tagzy for publication on the platform may be edited for length, clarity and/or consistency with Tagzy's editorial standards.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              XIV. INDEMNIFICATION
            </span>
          </h3>
          <p>
            You agree to indemnify and hold us and (as applicable) our parent, subsidiaries, affiliates, officers, directors, agents, and employees, harmless from any claim or demand, including reasonable attorneys fees, made by any third party due to or arising out of your breach of these terms, your violation of any law, or your violation of the rights of a third party, including the infringement by you of any intellectual property or other right of any person or entity. These obligations will survive any termination of the terms.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              XV. MISCELLANEOUS
            </span>
          </h3>
          <p>
            These terms will be governed by and construed in accordance with the Indian laws, without giving effect to its conflict of laws provisions or your actual state or country of residence, and you agree to submit to personal jurisdiction in India. You agree to exclude, in its entirety, the application to these terms of the United Nations Convention on Contracts for the International Sale of Goods. You are responsible for compliance with applicable laws. If for any reason a court of competent jurisdiction finds any provision or portion of the terms to be unenforceable, the remainder of the terms will continue in full force and effect. These terms constitute the entire agreement between us and supersedes and replaces all prior or contemporaneous understandings or agreements, written or oral, regarding the subject matter of these terms. Any waiver of any provision of the terms will be effective only if in writing and signed by you and Tagzy. Tagzy reserves the right to investigate complaints or reported violations of these terms and to take any action we deem necessary and appropriate. Such action may include reporting any suspected unlawful activity to law enforcement officials, regulators, or other third parties. In addition, we may take action to disclose any information necessary or appropriate to such persons or entities relating to user profiles, e-mail addresses, usage history, posted materials, IP addresses and traffic information. Tagzy reserves the right to seek all remedies available at law and in equity for violations of these terms.

            <br />
            Force Majeure. In no event shall we or any distribution site have liability or be deemed to be in breach thereof for any failure or delay of performance resulting from any governmental action, fire, flood, insurrection, earthquake, power failure, network failure, riot, explosion, embargo, strikes (whether legal or illegal), terrorist act, labor or material shortage, transportation interruption of any kind or work slowdown or any other condition not reasonably within our control. Your payment obligations shall continue during any event of force majeure. 
            
            <br />
            Indemnification. You agree to indemnify us and the distribution sites and hold us and the distribution site harmless from and with respect to any claims, actions, liabilities, losses, expenses, damages and costs (including, without limitation, actual attorneys' fees) that may at any time be incurred by us or them arising out of or in connection with these terms or any advertising products or services you request, including, without limitation, any claims, suits or proceedings for defamation or libel, violation of right of privacy or publicity, criminal investigations, infringement of intellectual property, false or deceptive advertising or sales practices and any virus, contaminating or destructive features.
            
            <br />
            Telephone Conversations. All telephone conversations between you and us about your advertising may be recorded and you hereby consent to such monitoring and recordation. 
            
            <br />
            Arbitration: Any disputes and differences whatsoever arising in connection with these terms shall be settled by Arbitration in accordance with the Arbitration and Conciliation Act, 1996. a) All proceedings shall be conducted in the English language. b) Unless the parties agree on a sole arbitrator there shall be three arbitrators, one to be selected by each of the parties, and the third to be selected by the two Arbitrators appointed by the parties. c) The venue of arbitration shall be in Bangalore, India.

            <br />
            Entire Agreement. These terms constitute the entire agreement between you and us with respect to the subject matter of these terms and supersedes all prior written and all prior or contemporaneous oral communications regarding such subject matter. Accordingly, you should not rely on any representations or warranties that are not expressly set forth in these terms. If any provision or provisions of these terms shall be held to be invalid, illegal, unenforceable or in conflict with the law of any jurisdiction, the validity, legality and enforceability of the remaining provisions shall not in any way be affected or impaired. Except as provided in Section 1, these terms may not be modified except by writing signed by you and us; provided, however, we may change these terms from time to time, and such revised terms and conditions shall be effective with respect to any advertising products ordered after written notice of such revised terms to you or, if earlier, posting of such revised terms and conditions on our website.
          </p>

          <h3>
            {" "}
            <span style={{ fontFamily: "serif" }}>
              XVI. END OF TERMS OF SERVICE
            </span>
          </h3>
          <p>
            If you have any questions or concerns regarding this Agreement, please contact us at  <a style={{textDecoration: 'underline'}} href="mailto:info@tagzy.in">info@tagzy.in</a> .
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
