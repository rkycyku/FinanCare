import { useState, useEffect } from "react";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";
import EksportoTeDhenat from "./EksportoTeDhenat";
import SortIcon from "./SortIcon";
import useSortableData from "../../../Context/useSortableData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import {
  faBan,
  faFileImport,
  faInfoCircle,
  faMoneyBill,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import CustomDatePicker from "../layout/CustomDatePicker";
import { format, parseISO } from "date-fns";

function Tabela({
  data,
  tableName,
  kaButona,
  funksionButonShto,
  funksionButonEdit,
  funksionButonFshij,
  funksionShfaqFature,
  funksioniEditoStokunQmimin,
  funksionNdryshoStatusinEFatures,
  funksionFaturoOferten,
  dateField,
  mosShfaqID,
  mosShfaqKerkimin,
}) {
  const [perditeso, setPerditeso] = useState(Date.now());
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { items, requestSort, sortConfig, currentPage, pageCount, goToPage } =
    useSortableData(
      data,
      perditeso,
      searchQuery,
      itemsPerPage,
      dateField,
      startDate,
      endDate
    );

  const headeri = data.length > 0 ? Object.keys(data[0]) : [];

  // Conditionally remove 'ID' from the header array
  const filteredHeaders = mosShfaqID
    ? headeri.filter((header) => header !== "ID")
    : headeri;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
  };

  const renderCellContent = (content) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  // Function to format date
  const formatDate = (dateStr) => {
    try {
      const date = parseISO(dateStr);
      return format(date, "dd/MM/yyyy"); // or 'yyyy-MM-dd' for a different format
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateStr;
    }
  };

  useEffect(() => {
    const tabelaDiv = document.querySelector(".tabelaDiv"); // Select the element with the class 'tabelaDiv'
    if (tabelaDiv) {
      tabelaDiv.style.zoom = "80%"; // Zoom out to 80% of the normal size
    }
  }, []);

  return (
    <div className="tabelaDiv">
      {data.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th colSpan={filteredHeaders.length + 1}>
                <h1 style={{ textAlign: "center" }}>{tableName}</h1>
              </th>
            </tr>
            {!mosShfaqKerkimin && (
              <>
                <tr>
                  <th colSpan={filteredHeaders.length + 1}>
                    <Row className="align-items-center">
                      <Col xs="auto" className="pe-0 mx-1">
                        {funksionButonShto && (
                          <Button
                            variant="success"
                            onClick={() => funksionButonShto()}>
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        )}
                      </Col>
                      <Col xs="auto" className="ps-0 pe-0">
                        {data.length > 0 && (
                          <EksportoTeDhenat
                            teDhenatJSON={data}
                            emriDokumentit={tableName}
                          />
                        )}
                      </Col>
                      {funksionNdryshoStatusinEFatures && (
                        <Col xs="auto" className="pe-0">
                          <Button
                            variant="success"
                            onClick={() => funksionNdryshoStatusinEFatures()}>
                            Ndrysho Statusin e Fatures{" "}
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </th>
                </tr>

                <tr>
                  <th colSpan={filteredHeaders.length + 1}>
                    <InputGroup style={{ width: "60%" }}>
                      {dateField && (
                        <div className="mx-1">
                          <CustomDatePicker
                            selectedDate={startDate}
                            onDateChange={setStartDate}
                            placeholderText="Data fillimit"
                            maxDate={endDate}
                          />
                          <CustomDatePicker
                            selectedDate={endDate}
                            onDateChange={setEndDate}
                            minDate={startDate}
                            placeholderText="Data përfundimit"
                          />
                        </div>
                      )}
                      <Form.Select
                        value={itemsPerPage}
                        onChange={(e) => {
                          handleItemsPerPageChange(parseInt(e.target.value));
                          goToPage(0);
                        }}>
                        <option value={20}>20 rreshta per faqe</option>
                        <option value={50}>50 rreshta per faqe</option>
                        <option value={100}>100 rreshta per faqe</option>
                      </Form.Select>
                      <Form.Control
                        type="text"
                        placeholder="Kerkoni"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSearchQuery("");
                          requestSort(null);
                          goToPage(0);
                          setStartDate(null);
                          setEndDate(null);
                        }}
                        id="button-addon2">
                        Pastro Filtrat
                      </Button>
                    </InputGroup>
                  </th>
                </tr>
              </>
            )}

            <tr>
              {filteredHeaders.map((header) => (
                <th key={header} onClick={() => requestSort(header)}>
                  {header}{" "}
                  {sortConfig.key === header ? (
                    <SortIcon direction={sortConfig.direction} type="text" />
                  ) : (
                    <SortIcon />
                  )}
                </th>
              ))}

              {kaButona && <th>Funksione</th>}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.ID}>
                {filteredHeaders.map((header) => (
                  <td key={`${item.ID}-${header}`}>
                    {header === dateField
                      ? formatDate(item[header]) // Format date field
                      : renderCellContent(item[header])}
                  </td>
                ))}
                {kaButona && (
                  <td>
                    {funksionShfaqFature && (
                      <Button
                        variant="outline-success"
                        size="sm"
                        style={{ marginRight: "0.5em" }}
                        onClick={() => funksionShfaqFature(item.ID)}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                      </Button>
                    )}
                    {funksionButonEdit && (
                      <Button
                        variant="outline-warning"
                        size="sm"
                        disabled={item["Statusi Kalkulimit"] === "I Mbyllur"}
                        style={{ marginRight: "0.5em" }}
                        onClick={() => funksionButonEdit(item.ID)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                    )}
                    {funksioniEditoStokunQmimin && (
                      <Button
                        variant="outline-info"
                        size="sm"
                        style={{ marginRight: "0.5em" }}
                        onClick={() => funksioniEditoStokunQmimin(item.ID)}>
                        <FontAwesomeIcon icon={faMoneyBill} />
                      </Button>
                    )}
                    {funksionButonFshij && (
                      <Button
                        size="sm"
                        style={{ marginRight: "0.5em" }}
                        variant="outline-danger"
                        onClick={() => funksionButonFshij(item.ID)}>
                        <FontAwesomeIcon icon={faBan} />
                      </Button>
                    )}
                    {funksionFaturoOferten && (
                      <Button
                        style={{ marginRight: "0.5em" }}
                        variant="success"
                        size="sm"
                        disabled={
                          item["Statusi Kalkulimit"] === "I Hapur" ||
                          item["Eshte Faturuar"] === "Po"
                        }
                        onClick={() => {
                          funksionFaturoOferten(item.ID);
                        }}>
                        Faturo Oferten <FontAwesomeIcon icon={faFileImport} />
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
            <tr>
              <td colSpan={filteredHeaders.length + 1}>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 0}
                  />
                  {Array.from({ length: pageCount }, (_, index) => (
                    <Pagination.Item
                      key={index}
                      active={index === currentPage}
                      onClick={() => goToPage(index)}>
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === pageCount - 1}
                  />
                </Pagination>
              </td>
            </tr>
          </tbody>
        </Table>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>
                <h1 style={{ textAlign: "center" }}>{tableName}</h1>
              </th>
            </tr>
            <tr>
              <th colSpan={filteredHeaders.length + 1}>
                <Row className="align-items-center">
                  <Col xs="auto" className="pe-0">
                    {funksionButonShto && (
                      <Button
                        variant="outline-success"
                        onClick={() => funksionButonShto()}>
                        <FontAwesomeIcon icon={faPlus} />
                      </Button>
                    )}
                  </Col>
                </Row>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nuk ka te dhena</td>
            </tr>
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Tabela;
