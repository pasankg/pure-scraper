<?php
/** 
 * @file
 * Class file for handling routes functionality.
 **/
class Endpoint
{
  private $scraper = [];
  private $data = [];

  /**
   * Constructor.
   */
  function __construct()
  {
    $this->scraper = new Scraper();
    $raw = $this->scraper->get_site_data();
    if ($raw->request) {
      $this->data = $this->scraper->get_articles($raw->data);
    } else {
      $this->data = [];
      $this->create_api_response($raw);
    }

  }

  /**
   * Control requests.
   * 
   * @return void|string HtmlDomParser
   * 		Returns a json response.
   */
  public function route()
  {
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);

    switch ($uri[1]) {
      case 'news':
        $this->get_news();
        break;
      case 'keywords':
        $this->get_keywords();
        break;
      default:
        header("HTTP/1.1 404 Not Found");
        break;
    }
  }

  /**
   * Get keywords.
   * 
   * @return void
   */
  public function get_keywords()
  {
    if (!empty($this->data)) {
      $keyWordData = $this->scraper->generate_keywords($this->data);
      $this->create_api_response($keyWordData);
    }
  }

  /**
   * Get news.
   * 
   * @return void
   */
  public function get_news()
  {
    if (!empty($this->data)) {
      $this->create_api_response($this->data);
    }
  }

  /**
   * Generate endpoint responses.
   * 
   * @return void
   */
  public function create_api_response($data)
  {
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    if ($_SERVER["REQUEST_METHOD"] === 'GET') {
      $response['body'] = json_encode($data);
      header('HTTP/1.1 200 OK');
      echo $response['body'];
    }
  }
}