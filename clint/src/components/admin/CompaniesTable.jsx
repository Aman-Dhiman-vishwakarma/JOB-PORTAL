import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DefaultAvtar from "../DefaultAvtar";

const CompaniesTable = () => {
  const { companies, searchcompanybytext } = useSelector(
    (store) => store.company
  );
  const [filtercompany, setfiltercompany] = useState(companies);

  useEffect(() => {
    const filteredcompany =
      companies?.length > 0 &&
      companies.filter((company) => {
        if (!searchcompanybytext) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchcompanybytext.toLowerCase());
      });
    setfiltercompany(filteredcompany);
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent register companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length <= 0 ? (
            <TableRow> <span className="text-lg font-semibold">You haven't register any company yet.</span></TableRow>
          ) : (
            
            companies?.map((company, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Avatar>
                    {company?.logo ? (
                      <AvatarImage src={company?.logo} />
                    ) : (
                      <DefaultAvtar name={company?.name} />
                    )}
                  </Avatar>
                </TableCell>
                <TableCell>{company?.name}</TableCell>
                <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center cursor-pointer w-full py-1 px-2 rounded-md hover:bg-gray-200">
                        <Link className="flex items-center ml-2 gap-2 " to={`/admin/companies/${company?._id}`}>
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                        </Link>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
