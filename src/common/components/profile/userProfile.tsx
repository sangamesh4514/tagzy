import { Avatar, AvatarFallback, AvatarImage } from "src/magicUi/ui/avatar";
import { Badge } from "src/magicUi/ui/badge";
import { Button } from "src/magicUi/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/magicUi/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/magicUi/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/magicUi/ui/tabs";
import { Calendar, Mail, MapPin, Phone, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUserProfile } from "src/common/types";
import { languageCodeToName } from "src/common/constant";
import NewPro from "../NewPro";
import Header from "../Header";
import Footer from "../Footer";

const ProProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>(); // Extract userId from the URL
  const [userData, setUserData] = useState<IUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://web-production-ff56.up.railway.app/user/id/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: IUserProfile = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%", fontSize: 42 }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%", fontSize: 42 }}>
        <p>User not found.</p>
      </div>
    );
  }

  const renderDialogContent = (name?: string) => {
    return (
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-black">
            Book {name || userData?.name}
          </DialogTitle>
          <DialogDescription>
            Scan the QR code or download our app to book this service
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="mx-auto">
            {/* <img
              src="/placeholder.svg?height=200&width=200"
              alt="QR Code"
              className="w-48 h-48 object-contain"
            /> */}
            Download App
          </div>
          <div className="flex justify-center gap-4">
            {/* <img
              src="/placeholder.svg?height=40&width=135"
              alt="Download on Play Store"
              className="h-12 object-contain"
            />
            <img
              src="/placeholder.svg?height=40&width=135"
              alt="Download on App Store"
              className="h-12 object-contain"
            /> */}
            <a
              href="https://apps.apple.com/in/app/tagzy/id6737283128"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease-in-out",
                borderRadius: "10px",
                overflow: "hidden",
                width: "140px",
                height: "40px", // Adjust height to avoid inner black padding
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src="/assets/appstore.png"
                alt="Download on the App Store"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                }}
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.tagzy.hire_pro"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.2s ease-in-out",
                borderRadius: "10px",
                overflow: "hidden",
                width: "140px",
                height: "40px", // Adjust height to match the image size
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <img
                src="/assets/playStore.png"
                alt="Get it on Google Play"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
                }}
              />
            </a>
          </div>
        </div>
      </DialogContent>
    );
  };

  const test = false;

  return (
    <>
      {test ? (
        <div className="min-h-screen bg-[#ffffff] relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-50">
              <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
              <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
            </div>
          </div>

          <div className="relative">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold text-center mb-8 text-black">
                AAP KI APNI DUKAN
              </h1>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <Card className="md:col-span-1 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <CardHeader>
                    <Avatar className="w-32 h-32 mx-auto">
                      <AvatarImage
                        src={userData?.profilePicture}
                        alt={userData?.name}
                      />
                      <AvatarFallback>
                        {userData?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-center mt-4 text-black">
                      {userData?.name}
                    </CardTitle>
                    <CardDescription className="text-center text-gray-600">
                      {userData?.skillTitle}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center space-x-2 mb-4">
                      {userData?.isUserPro && (
                        <Badge className="bg-black text-white hover:bg-gray-800">
                          Pro
                        </Badge>
                      )}
                      {userData?.isUserVerified && (
                        <Badge
                          variant="outline"
                          className="border-black text-black"
                        >
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin className="h-4 w-4" />
                        <span>{userData?.location?.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone className="h-4 w-4" />
                        <span>{userData?.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail className="h-4 w-4" />
                        <span>{userData?.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar className="h-4 w-4" />
                        <span>Member since June 24, 2024</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {/* <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors">
                  Contact {userData?.name}
                </Button> */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors">
                          Contact {userData?.name}
                        </Button>
                      </DialogTrigger>
                      {renderDialogContent()}
                    </Dialog>
                  </CardFooter>
                </Card>

                {/* Tabs Card */}
                <Card className="md:col-span-2 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-xl">
                  <Tabs defaultValue="about" className="w-full">
                    <CardHeader>
                      <TabsList className="grid w-full grid-cols-3 bg-gray-100">
                        <TabsTrigger
                          value="about"
                          className="data-[state=active]:bg-black data-[state=active]:text-white"
                        >
                          About
                        </TabsTrigger>
                        <TabsTrigger
                          value="services"
                          className="data-[state=active]:bg-black data-[state=active]:text-white"
                        >
                          Services
                        </TabsTrigger>
                        <TabsTrigger
                          value="reviews"
                          className="data-[state=active]:bg-black data-[state=active]:text-white"
                        >
                          Reviews
                        </TabsTrigger>
                      </TabsList>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <TabsContent value="about" className="mt-0 space-y-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-black">
                            About
                          </h3>
                          <p className="text-gray-600">
                            {userData?.description}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-black">
                            Experience
                          </h3>
                          <p className="text-gray-600">
                            {userData?.experience} years of professional
                            experience
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-2 text-black">
                            Languages
                          </h3>
                          <div className="flex gap-2">
                            {userData?.languages?.map((language, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="border-black text-black"
                              >
                                {languageCodeToName[+language - 1]}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="services" className="mt-0">
                        <div className="space-y-6">
                          {userData?.services?.map((service, index) => (
                            <Card
                              key={index}
                              className="border border-gray-200"
                            >
                              <CardHeader>
                                <CardTitle className="text-black">
                                  {service.name}
                                </CardTitle>
                                <CardDescription>
                                  {service.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="flex justify-between items-center mb-4">
                                  <div className="text-2xl font-bold text-black">
                                    ₹{service.cost}
                                  </div>
                                  {service.discount > 0 && (
                                    <Badge className="bg-red-500 text-white hover:bg-red-600">
                                      {service.discount}% OFF
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 mb-4">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm text-gray-600">
                                    {service.rating} ({service.ratingCount}{" "}
                                    ratings)
                                  </span>
                                </div>
                                {service?.addOns?.length > 0 && (
                                  <div className="space-y-3">
                                    <h4 className="font-semibold text-black">
                                      Add-ons Available:
                                    </h4>
                                    {service?.addOns.map(
                                      (addon, addonIndex) => (
                                        <div
                                          key={addonIndex}
                                          className="bg-gray-50 p-4 rounded-lg"
                                        >
                                          <div className="flex justify-between items-center mb-2">
                                            <h5 className="font-semibold text-black">
                                              {addon.name}
                                            </h5>
                                            <span className="font-bold text-black">
                                              ₹{addon.cost}
                                            </span>
                                          </div>
                                          <p className="text-sm text-gray-600">
                                            {addon.description}
                                          </p>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              </CardContent>
                              <CardFooter>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button className="w-full bg-black text-white hover:bg-gray-800 transition-colors">
                                      Book Now
                                    </Button>
                                  </DialogTrigger>
                                  {renderDialogContent(service?.name)}
                                </Dialog>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="reviews" className="mt-0">
                        <div className="text-center space-y-4">
                          <div className="inline-flex items-center justify-center">
                            <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                            <span className="text-3xl font-bold ml-2 text-black">
                              {userData?.services &&
                                userData?.services[0].rating}
                            </span>
                          </div>
                          <p className="text-gray-600">
                            Based on{" "}
                            {userData?.services &&
                              userData?.services[0].ratingCount}{" "}
                            ratings and{" "}
                            {userData?.services &&
                              userData?.services[0].reviewCount}{" "}
                            reviews
                          </p>
                        </div>
                      </TabsContent>
                    </CardContent>
                  </Tabs>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Header />
          <NewPro userProfile={userData} />
          <Footer />
        </>
      )}
    </>
  );
};

export default ProProfile;
