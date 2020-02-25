cmake_minimum_required(VERSION 3.15)
project(kursach_DO)

set(CMAKE_CXX_STANDARD 20)

add_subdirectory(lib)
add_subdirectory(utils)
set(SOURCE_FILE main.cpp)

set(TEST_FILES sources)

file(GLOB ${TEST_FILES} "*.txt")
file(COPY ${TEST_FILES} DESTINATION ${CMAKE_CURRENT_BINARY_DIR})

add_executable(kursach_DO ${SOURCE_FILE})
target_link_libraries(kursach_DO AlgorithmModule UtilsModule)