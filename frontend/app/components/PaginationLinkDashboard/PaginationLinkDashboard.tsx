import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { SetStateAction } from "react";

export const PaginationLinkDashboard = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;

  totalPages: number;
}) => (
  <Pagination>
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => {
            setPage((prev: number) => Number(prev > 1 ? prev - 1 : prev));
          }}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink href="#">{page}</PaginationLink>
      </PaginationItem>
      <div>{`total: ${totalPages}`}</div>
      <PaginationItem>
        <PaginationNext
          onClick={() => {
            setPage((prev: number) =>
              Number(prev < totalPages ? prev + 1 : prev)
            );
          }}
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);
