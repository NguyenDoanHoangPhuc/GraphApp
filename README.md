## Những chức năng cơ bản của ứng dụng:
   - Hỗ trợ vẽ đồ thị (ngẫu nhiên hoặc tự thêm vào)
   - Kéo thả để có thể tối ưu đồ thị
   - Duyệt đồ thị và hiển thị kết quả
## Cấu trúc thư mục của ứng dụng
   Được chia làm loại chính như sau:
   - Thư mục hệ thống: chỉ cần quan tâm chủ yếu đến *android* vì đây là thư mục giúp ta tùy chỉnh ứng dụng ở chế độ android cũng như xuất file .apk
   - Thư mục chứa hình ảnh và các tệp tin cần thêm vào: *assets*
   - Thư mục chứa các màn hình của hệ thống: *screens*
   - Thư mục chứa các dữ liệu: *data_structure* (Các cấu trúc dữ liệu như stack, queue) và *graph_data*
   - Thư mục chứa các module hỗ trợ render: *graph_render*
## Các màn hình của ứng dụng (screens):
   Trong react-native, các màn hình được biểu diễn bằng một module và viết bằng javascript, nên một file js trong screens đại diện cho một màn hình trong ứng dụng:
   - Welcome.js: màn hình chào mừng
   - InputGraph.js: màn hình chọn loại đồ thị
   - DrawGraph.js: màn hình vẽ đồ thị
   - InputGraphSearch.js: màn hình chọn loại thuật toán đồ thị
   - GraphSearch.js: màn hình thực hiện duyệt và hiển thị các đỉnh lên màn hình
## Các module, thư viện của ứng dụng
   - Các thư viện hỗ trợ:
     + react-native-svg (dùng hình tròn, đường thẳng để vẽ đồ thị)
     + react-native-swiper (làm màn hình trượt được trong Welcome.js)
     + react-navigation (tập hợp các thư viện giúp chuyển từ màn hình này sang màn hình khác)
   - Module tự viết:
     + graph_render/renderGraph.js: module dùng để vẽ đồ thị từ một dữ liệu cho trước
## Các kiểu tổ chức dữ liệu của ứng dụng:
   - Cấu trúc dữ liệu (data_structure/DataStructure.js): các cấu trúc dữ liệu như Stack, Queue
   - Cấu trúc đồ thị (graph_data/Graph.js):
     Tập hợp các biểu diễn đỉnh (vertex), cung (edge), đồ thị (graph) và các loại đồ thị cơ bản
     + UndirectedSimpleGraph: đơn đồ thị vô hướng
     + UndirectedMultiGraph: đa đồ thị vô hướng
     + PseudoGraph: giả đồ thị
     + DirectedSimpleGraph: đơn đồ thị có hướng
     + DirectedMultiNoLoopGraph: đa đồ thị có hướng không khuyên
     + DirectedMultiLoopGraph: đa đồ thị có hướng có khuyên
     
     Tất cả loại đồ thị trên đều là lớp con của Graph và dùng chung một hàm khởi tạo constructor(). Bao gồm các hàm dùng chung như:
       - createVertex(số lượng đỉnh): khởi tạo đỉnh ngẫu nhiên
       - createtRandomEdges(số lượng cung): khởi tạo cung ngẫu nhiên
       - addVertexById, addvertexByVertex,... : thêm đỉnh
       - addEdgeById, addEdgeByVertex,...: thêm cung
   - Cấu trúc biểu diễn đồ thị (graph_data/Graph_Representation.js):
     + Gồm AjacencyMatrix(ma trận kề)
   - Cấu trúc thuật toán đồ thị (graph_data/Graph_Algorithm.js):
     + Gồm ba thuật toán BFS, DFS, DFS đệ quy


