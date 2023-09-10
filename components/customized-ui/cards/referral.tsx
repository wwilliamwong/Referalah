import React, { useState } from "react"
import ContactDialog from "@/modules/referral/components/dialog/contact"
import ReferralCardDropDownMenu from "@/modules/referral/components/drop-down-menu/card"

import { ICityResponse } from "@/types/api/response/city"
import { ICountryResponse } from "@/types/api/response/country"
import { IIndustryResponse } from "@/types/api/response/industry"
import { IProvinceResponse } from "@/types/api/response/province"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import BaseAvatar from "@/components/customized-ui/avatars/base"
import LinkTooltip from "@/components/customized-ui/tool/Link"
import { Icons } from "@/components/icons"

interface IReferralCardProps {
  uuid: string | null
  username: string
  photoUrl: string | null
  description: string | null
  companyName: string | null
  jobTitle: string | null
  yearOfExperience: number | null
  countryUuid: string | null
  provinceUuid: string | null
  cityUuid: string | null
  socialMediaUrl: string | null
  industryUuid: string | null
  industryList: IIndustryResponse[]
  countryList: ICountryResponse[]
  cityList: ICityResponse[]
  provinceList: IProvinceResponse[]
}
const ReferralCard: React.FunctionComponent<IReferralCardProps> = ({
  jobTitle,
  cityUuid,
  companyName,
  countryUuid,
  description,
  industryUuid,
  photoUrl,
  provinceUuid,
  socialMediaUrl,
  username,
  uuid,
  yearOfExperience,
  industryList,
  countryList,
  cityList,
  provinceList,
}) => {
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const country = countryList.find(
    (c) => c.uuid === countryUuid
  )?.cantonese_name

  const province = provinceList.find(
    (c) => c.uuid === provinceUuid
  )?.cantonese_name

  const city = cityList.find((c) => c.uuid === cityUuid)?.cantonese_name

  const industry = industryList.find(
    (c) => c.uuid === industryUuid
  )?.cantonese_name

  return (
    <>
      <ContactDialog
        open={isContactFormOpen}
        username={username}
        onContactFormClose={() => setIsContactFormOpen(false)}
      />
      <Card className="flex max-w-[350px] h-[350px] w-full flex-col justify-between">
        {/* <div className="absolute">
          <ContactDialog />
        </div> */}
        <CardHeader className="justify-between">
          <CardTitle className="flex  flex-row justify-between items-center">
            <span>{jobTitle}</span>
            <ReferralCardDropDownMenu
              url={socialMediaUrl}
              onContactClick={() => setIsContactFormOpen(true)}
            />
          </CardTitle>
          <CardDescription>{companyName}</CardDescription>
        </CardHeader>
        <CardContent className=" h-full w-full px-6">
          <ScrollArea className="h-[125px] w-full">{description}</ScrollArea>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="flex flex-row items-center justify-start">
            {photoUrl && (
              <BaseAvatar
                fallBack={username[0]}
                alt={username}
                url={photoUrl}
              />
            )}
            {!photoUrl && <Icons.user />}

            <p className="text-sm test">{username}</p>
          </div>
          <div className="gap-x-2">
            {country && <Badge variant="outline">{country}</Badge>}
            {province && <Badge variant="outline">{province}</Badge>}
            {city && <Badge variant="outline">{city}</Badge>}
            {industry && <Badge variant="outline">{industry}</Badge>}
            {typeof yearOfExperience === "number" && yearOfExperience >= 0 && (
              <Badge variant="outline">{yearOfExperience}年經驗</Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  )
}

export default ReferralCard
